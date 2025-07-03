import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Loader2, Download, RefreshCw, Search } from 'lucide-react';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://crm-supabase.7za6uc.easypanel.host';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface WaitingListEntry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  created_at: string;
}

const WaitingListAdmin = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<WaitingListEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Simple authentication
  const authenticate = () => {
    // This is a simple password protection - in a real app, use proper authentication
    if (password === 'intimatecare2025') {
      setIsAuthenticated(true);
      localStorage.setItem('waitingListAuth', 'true');
      fetchWaitingList();
    } else {
      toast({
        title: "Authentication Failed",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  // Check if already authenticated
  useEffect(() => {
    const isAuth = localStorage.getItem('waitingListAuth') === 'true';
    setIsAuthenticated(isAuth);
    if (isAuth) {
      fetchWaitingList();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Fetch waiting list entries
  const fetchWaitingList = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('waiting_list')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching waiting list:', error);
      toast({
        title: "Error",
        description: "Failed to load waiting list data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter entries based on search term
  const filteredEntries = entries.filter(entry => 
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (entry.phone && entry.phone.includes(searchTerm)) ||
    (entry.message && entry.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Export data as CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Message', 'Created At'];
    const csvData = filteredEntries.map(entry => [
      entry.name,
      entry.email,
      entry.phone || '',
      entry.message || '',
      format(new Date(entry.created_at), 'yyyy-MM-dd HH:mm:ss')
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `waiting-list-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  if (!isAuthenticated) {
    return (
      <div className="container max-w-md mx-auto py-20">
        <Card>
          <CardHeader>
            <CardTitle>Admin Authentication</CardTitle>
            <CardDescription>Enter password to view waiting list data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && authenticate()}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={authenticate}
              className="w-full"
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Waiting List Submissions</h1>
          <p className="text-gray-500">
            {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'} found
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={fetchWaitingList}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
          <Button 
            onClick={exportToCSV}
            disabled={filteredEntries.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableCaption>Waiting list submissions in reverse chronological order</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="hidden md:table-cell">Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-[#FF7A9A]" />
                    </div>
                    <p className="mt-2 text-gray-500">Loading entries...</p>
                  </TableCell>
                </TableRow>
              ) : filteredEntries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <p className="text-gray-500">No entries found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.name}</TableCell>
                    <TableCell>{entry.email}</TableCell>
                    <TableCell>{entry.phone || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">
                      {entry.message || '-'}
                    </TableCell>
                    <TableCell>{formatDate(entry.created_at)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitingListAdmin;
