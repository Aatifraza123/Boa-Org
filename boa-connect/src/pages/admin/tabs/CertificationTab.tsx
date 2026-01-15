import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import { adminAuthAPI } from '@/lib/api';

export function CertificationTab() {
  const [certification, setCertification] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    organization_name: '',
    registration_number: '',
    certificate_number: '',
    registration_act: '',
    registration_date: '',
    registered_office: '',
    certificate_image_url: ''
  });

  useEffect(() => {
    loadCertification();
  }, []);

  const loadCertification = async () => {
    try {
      const response = await adminAuthAPI.get('/admin/certification');
      if (response.certification) {
        setCertification(response.certification);
        setFormData({
          organization_name: response.certification.organization_name || '',
          registration_number: response.certification.registration_number || '',
          certificate_number: response.certification.certificate_number || '',
          registration_act: response.certification.registration_act || '',
          registration_date: response.certification.registration_date?.split('T')[0] || '',
          registered_office: response.certification.registered_office || '',
          certificate_image_url: response.certification.certificate_image_url || ''
        });
      }
    } catch (error) {
      console.error('Failed to load certification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await adminAuthAPI.uploadCertificateImage(formData);
      
      if (response.success) {
        setFormData(prev => ({
          ...prev,
          certificate_image_url: response.image_url
        }));
        alert('Image uploaded successfully!');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await adminAuthAPI.put('/admin/certification', formData);
      alert('Certification updated successfully!');
      loadCertification();
    } catch (error: any) {
      console.error('Save error:', error);
      alert(error.response?.data?.message || 'Failed to update certification');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Certification Management</h2>
        <p className="text-muted-foreground">Manage organization certification details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Organization Name */}
          <div className="space-y-2">
            <Label htmlFor="organization_name">Organization Name</Label>
            <Input
              id="organization_name"
              value={formData.organization_name}
              onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })}
              required
            />
          </div>

          {/* Registration Number */}
          <div className="space-y-2">
            <Label htmlFor="registration_number">Registration Number</Label>
            <Input
              id="registration_number"
              value={formData.registration_number}
              onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
              required
            />
          </div>

          {/* Certificate Number */}
          <div className="space-y-2">
            <Label htmlFor="certificate_number">Certificate Number</Label>
            <Input
              id="certificate_number"
              value={formData.certificate_number}
              onChange={(e) => setFormData({ ...formData, certificate_number: e.target.value })}
              required
            />
          </div>

          {/* Registration Act */}
          <div className="space-y-2">
            <Label htmlFor="registration_act">Registration Act</Label>
            <Input
              id="registration_act"
              value={formData.registration_act}
              onChange={(e) => setFormData({ ...formData, registration_act: e.target.value })}
              required
            />
          </div>

          {/* Registration Date */}
          <div className="space-y-2">
            <Label htmlFor="registration_date">Registration Date</Label>
            <Input
              id="registration_date"
              type="date"
              value={formData.registration_date}
              onChange={(e) => setFormData({ ...formData, registration_date: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Registered Office */}
        <div className="space-y-2">
          <Label htmlFor="registered_office">Registered Office Address</Label>
          <Textarea
            id="registered_office"
            value={formData.registered_office}
            onChange={(e) => setFormData({ ...formData, registered_office: e.target.value })}
            rows={3}
            required
          />
        </div>

        {/* Certificate Image Upload */}
        <div className="space-y-4">
          <Label>Certificate Image</Label>
          
          {formData.certificate_image_url && (
            <div className="relative rounded-lg border border-border overflow-hidden">
              <img
                src={formData.certificate_image_url}
                alt="Certificate"
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>
          )}

          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="cursor-pointer"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
              onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Upload certificate image (Max 5MB, JPG/PNG)
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Certification
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
