import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Calendar, MapPin, ArrowRight, Bell, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notifications');
      const data = await response.json();
      if (data.success) {
        // Filter only active notifications
        const activeNotifs = (data.notifications || []).filter((n: any) => n.is_active);
        setNotifications(activeNotifs);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadForm = async (seminarId: number, seminarName: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/seminars/${seminarId}`);
      const data = await response.json();
      
      if (data.success && data.seminar.offline_form_html) {
        // Create HTML file with proper structure
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${seminarName} - Offline Registration Form</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
${data.seminar.offline_form_html}
</body>
</html>`;
        
        // Create blob and download
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${seminarName.replace(/[^a-z0-9]/gi, '_')}_Registration_Form.html`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Offline form not available for this seminar');
      }
    } catch (error) {
      console.error('Failed to download form:', error);
      alert('Failed to download form');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-20 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
        <div className="container ml-[310px] text-start max-w-3xl mt-2">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl gradient-primary mb-6">
            <Bell className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="text-xl md:text-3xl font-bold text-foreground mb-4">
            Notifications
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with our latest seminars and events
          </p>
        </div>

      {/* Notifications List */}
      <section className="py-16">
        <div className="container max-w-4xl">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Active Notifications</h3>
              <p className="text-muted-foreground">
                There are no active seminars or events at the moment. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elevated transition-all duration-300 p-6"
                >
                  {/* Active Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="gradient-gold text-secondary-foreground border-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-foreground mr-1.5 animate-pulse" />
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl gradient-primary flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary-foreground" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2 pr-20">
                        {notification.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {notification.message}
                      </p>

                      {notification.seminar_id && (
                        <div className="flex gap-2">
                          <Link to={`/seminar/${notification.seminar_id}/register`}>
                            <Button className="gradient-primary text-primary-foreground">
                              Register Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="outline"
                            onClick={() => handleDownloadForm(notification.seminar_id, notification.title)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Offline Form
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Posted on {new Date(notification.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
