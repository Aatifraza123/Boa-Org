import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Upload, Download } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/utils';

export default function OfflineUsersTab() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    membership_no: '',
    title: 'dr',
    first_name: '',
    surname: '',
    email: '',
    mobile: '',
    password: '',
    gender: 'male',
    city: 'Patna',
    state: 'Bihar',
    pin_code: '800001'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/import-offline-user`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.data.success) {
        toast({
          title: 'Success!',
          description: `User ${formData.membership_no} added successfully`,
        });
        
        // Reset form
        setFormData({
          membership_no: '',
          title: 'dr',
          first_name: '',
          surname: '',
          email: '',
          mobile: '',
          password: '',
          gender: 'male',
          city: 'Patna',
          state: 'Bihar',
          pin_code: '800001'
        });
      }
    } catch (error: any) {
      let errorMessage = 'Failed to add user';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
        
        // Special handling for membership number conflicts
        if (error.response.data.message.includes('already exists')) {
          errorMessage = `❌ Conflict: ${error.response.data.message}`;
        }
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = 'membership_no,title,first_name,surname,email,mobile,password,gender,city,state,pin_code\nBOA-2024-0001,dr,Rajesh,Kumar,rajesh@example.com,9876543210,password123,male,Patna,Bihar,800001';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'offline-users-template.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Import Offline Users</h2>
          <p className="text-muted-foreground">Add users who registered offline with membership numbers</p>
        </div>
        <Button variant="outline" onClick={downloadTemplate}>
          <Download className="mr-2 h-4 w-4" />
          Download Template
        </Button>
      </div>

      {/* Single User Form */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <UserPlus className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Add Single User</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="membership_no">Membership Number *</Label>
              <Input
                id="membership_no"
                required
                placeholder="BOA-2024-0001"
                value={formData.membership_no}
                onChange={(e) => setFormData({ ...formData, membership_no: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Select value={formData.title} onValueChange={(value) => setFormData({ ...formData, title: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr">Dr.</SelectItem>
                  <SelectItem value="prof">Prof.</SelectItem>
                  <SelectItem value="mr">Mr.</SelectItem>
                  <SelectItem value="mrs">Mrs.</SelectItem>
                  <SelectItem value="ms">Ms.</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                required
                placeholder="Rajesh"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="surname">Surname</Label>
              <Input
                id="surname"
                placeholder="Kumar"
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="rajesh@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Leave empty for auto-generated email</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                placeholder="9876543210"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">User will login with this password</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Patna"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="Bihar"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pin_code">PIN Code</Label>
              <Input
                id="pin_code"
                placeholder="800001"
                value={formData.pin_code}
                onChange={(e) => setFormData({ ...formData, pin_code: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="gradient-primary text-primary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setFormData({
                membership_no: '',
                title: 'dr',
                first_name: '',
                surname: '',
                email: '',
                mobile: '',
                password: '',
                gender: 'male',
                city: 'Patna',
                state: 'Bihar',
                pin_code: '800001'
              })}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </div>

      {/* Instructions */}
      <div className="bg-accent/30 rounded-xl p-6 border border-border">
        <h3 className="font-semibold text-foreground mb-3">📋 Instructions</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Membership number must be unique (e.g., BOA-2024-0001)</li>
          <li>• User will login with membership number and password</li>
          <li>• Email is optional - auto-generated if not provided</li>
          <li>• All imported users are marked as BOA members</li>
          <li>• Users can update their profile after first login</li>
        </ul>
      </div>
    </div>
  );
}
