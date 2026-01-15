import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Shield, Calendar, Edit, Save, X } from 'lucide-react';

export default function AdminProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [admin, setAdmin] = useState<any>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  useEffect(() => {
    loadAdminProfile();
  }, []);

  const loadAdminProfile = () => {
    const adminData = JSON.parse(localStorage.getItem('admin') || '{}');
    if (!adminData.id) {
      navigate('/admin-login');
      return;
    }
    setAdmin(adminData);
    setFormData({
      full_name: adminData.full_name || '',
      email: adminData.email || '',
      current_password: '',
      new_password: '',
      confirm_password: ''
    });
  };

  const handleSave = async () => {
    if (formData.new_password && formData.new_password !== formData.confirm_password) {
      toast({
        title: 'Error',
        description: 'New passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (formData.new_password && formData.new_password.length < 8) {
      toast({
        title: 'Error',
        description: 'Password must be at least 8 characters',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      const updateData: any = {
        full_name: formData.full_name,
        email: formData.email
      };

      if (formData.new_password) {
        updateData.current_password = formData.current_password;
        updateData.new_password = formData.new_password;
      }

      const response = await fetch('http://localhost:5000/api/admin-auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (data.success) {
        // Update localStorage
        const updatedAdmin = { ...admin, ...updateData };
        delete updatedAdmin.current_password;
        delete updatedAdmin.new_password;
        localStorage.setItem('admin', JSON.stringify(updatedAdmin));
        
        setAdmin(updatedAdmin);
        setIsEditing(false);
        setFormData({
          ...formData,
          current_password: '',
          new_password: '',
          confirm_password: ''
        });

        toast({
          title: 'Success',
          description: 'Profile updated successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to update profile',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Update error:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      full_name: admin.full_name || '',
      email: admin.email || '',
      current_password: '',
      new_password: '',
      confirm_password: ''
    });
  };

  if (!admin) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Profile</h1>
            <p className="text-muted-foreground">Manage your account settings</p>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="gradient-primary text-primary-foreground">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="p-6 md:col-span-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mb-4">
                {admin.username?.[0]?.toUpperCase() || 'A'}
              </div>
              <h2 className="text-xl font-bold">{admin.full_name || admin.username}</h2>
              <p className="text-sm text-muted-foreground mb-3">@{admin.username}</p>
              <Badge className="mb-4">{admin.role}</Badge>
              
              <div className="w-full space-y-3 mt-4 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{admin.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Admin Access</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Joined {new Date(admin.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Details Card */}
          <Card className="p-6 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email"
                  />
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Change Password (Optional)</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <Label>Current Password</Label>
                      <Input
                        type="password"
                        value={formData.current_password}
                        onChange={(e) => setFormData({ ...formData, current_password: e.target.value })}
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <Label>New Password</Label>
                      <Input
                        type="password"
                        value={formData.new_password}
                        onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                        placeholder="Enter new password (min 8 characters)"
                      />
                    </div>

                    <div>
                      <Label>Confirm New Password</Label>
                      <Input
                        type="password"
                        value={formData.confirm_password}
                        onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="gradient-primary text-primary-foreground"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Username</Label>
                  <p className="font-medium">{admin.username}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Full Name</Label>
                  <p className="font-medium">{admin.full_name || 'Not set'}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{admin.email}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Role</Label>
                  <p className="font-medium capitalize">{admin.role.replace('_', ' ')}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Account Status</Label>
                  <p className="font-medium">
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Last Login</Label>
                  <p className="font-medium">
                    {admin.last_login 
                      ? new Date(admin.last_login).toLocaleString() 
                      : 'Never'}
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Activity Stats */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-accent rounded-lg">
              <p className="text-2xl font-bold text-primary">-</p>
              <p className="text-sm text-muted-foreground">Total Logins</p>
            </div>
            <div className="text-center p-4 bg-accent rounded-lg">
              <p className="text-2xl font-bold text-primary">-</p>
              <p className="text-sm text-muted-foreground">Actions Performed</p>
            </div>
            <div className="text-center p-4 bg-accent rounded-lg">
              <p className="text-2xl font-bold text-primary">-</p>
              <p className="text-sm text-muted-foreground">Records Modified</p>
            </div>
            <div className="text-center p-4 bg-accent rounded-lg">
              <p className="text-2xl font-bold text-primary">
                {new Date(admin.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
              </p>
              <p className="text-sm text-muted-foreground">Member Since</p>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
