import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

interface AddCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  onSuccess: () => void;
}

export default function AddCertificateModal({ isOpen, onClose, userId, onSuccess }: AddCertificateModalProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    certificate_name: '',
    issued_date: '',
    description: '',
    certificate_file: null as File | null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, certificate_file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.certificate_file) {
      toast({
        title: 'Error',
        description: 'Please select a certificate file',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const uploadData = new FormData();
      uploadData.append('user_id', userId.toString());
      uploadData.append('certificate_name', formData.certificate_name);
      uploadData.append('issued_date', formData.issued_date);
      uploadData.append('description', formData.description);
      uploadData.append('certificate', formData.certificate_file);

      const response = await fetch('http://localhost:5000/api/certificates/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'Certificate added successfully',
        });
        setFormData({
          certificate_name: '',
          issued_date: '',
          description: '',
          certificate_file: null
        });
        onSuccess();
        onClose();
      } else {
        throw new Error(data.message || 'Failed to add certificate');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload certificate',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Certificate</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="certificate_name">Certificate Name <span className="text-destructive">*</span></Label>
            <Input
              id="certificate_name"
              placeholder="e.g., Seminar Participation Certificate"
              value={formData.certificate_name}
              onChange={(e) => setFormData({ ...formData, certificate_name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issued_date">Issue Date</Label>
            <Input
              id="issued_date"
              type="date"
              value={formData.issued_date}
              onChange={(e) => setFormData({ ...formData, issued_date: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Optional description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificate_file">Certificate File (PDF) <span className="text-destructive">*</span></Label>
            <div className="flex items-center gap-2">
              <Input
                id="certificate_file"
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileChange}
                required
              />
              {formData.certificate_file && (
                <span className="text-sm text-green-600">✓</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Accepted formats: PDF, JPG, PNG (Max 5MB)
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading} className="gap-2">
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload Certificate
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
