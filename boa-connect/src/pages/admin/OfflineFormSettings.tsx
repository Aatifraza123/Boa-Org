import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, BarChart3, Calendar, FileText, CreditCard, Users, 
  Bell, Settings, Save, Plus, Trash2, GripVertical, ToggleLeft, ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  getOfflineFormConfig, 
  saveOfflineFormConfig, 
  defaultOfflineFormConfig,
  OfflineFormConfig,
  OfflineFeeCategory,
  OfflineFormSection
} from '@/lib/offlineFormConfig';
import { generateOfflineRegistrationPdf } from '@/lib/generateOfflinePdf';

export default function OfflineFormSettings() {
  const [config, setConfig] = useState<OfflineFormConfig>(defaultOfflineFormConfig);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setConfig(getOfflineFormConfig());
  }, []);

  const handleSave = () => {
    saveOfflineFormConfig(config);
    setHasChanges(false);
    toast.success('Offline form settings saved successfully!');
  };

  const handleReset = () => {
    setConfig(defaultOfflineFormConfig);
    saveOfflineFormConfig(defaultOfflineFormConfig);
    setHasChanges(false);
    toast.success('Form settings reset to default');
  };

  const updateConfig = (updates: Partial<OfflineFormConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const updateFeeCategory = (id: string, updates: Partial<OfflineFeeCategory>) => {
    setConfig(prev => ({
      ...prev,
      feeCategories: prev.feeCategories.map(cat => 
        cat.id === id ? { ...cat, ...updates } : cat
      )
    }));
    setHasChanges(true);
  };

  const toggleSection = (sectionId: string) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, enabled: !section.enabled } : section
      )
    }));
    setHasChanges(true);
  };

  const toggleField = (sectionId: string, fieldId: string) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId 
          ? {
              ...section,
              fields: section.fields.map(field =>
                field.id === fieldId ? { ...field, enabled: !field.enabled } : field
              )
            }
          : section
      )
    }));
    setHasChanges(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border hidden lg:block">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
              <Eye className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-foreground">BOA Admin</span>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </Link>
        </div>

        <nav className="px-4 space-y-1">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <BarChart3 className="h-5 w-5" />
            Dashboard
          </Link>
          <Link to="/admin/seminars" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Calendar className="h-5 w-5" />
            Seminars
          </Link>
          <Link to="/admin/registrations" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <FileText className="h-5 w-5" />
            Registrations
          </Link>
          <Link to="/admin/payments" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <CreditCard className="h-5 w-5" />
            Payments
          </Link>
          <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Users className="h-5 w-5" />
            Users
          </Link>
          <Link to="/admin/notifications" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" />
            Notifications
          </Link>
          <Link to="/admin/offline-form" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent text-accent-foreground font-medium">
            <FileText className="h-5 w-5" />
            Offline Form
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Offline Registration Form</h1>
                <p className="text-muted-foreground">Configure the downloadable PDF registration form</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => generateOfflineRegistrationPdf()}>
                Preview PDF
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset to Default
              </Button>
              <Button 
                className="gradient-primary text-primary-foreground" 
                onClick={handleSave}
                disabled={!hasChanges}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>

          {/* Seminar Info */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Seminar Information</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="seminarName">Seminar Name</Label>
                <Input
                  id="seminarName"
                  value={config.seminarName}
                  onChange={(e) => updateConfig({ seminarName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seminarDates">Dates</Label>
                <Input
                  id="seminarDates"
                  value={config.seminarDates}
                  onChange={(e) => updateConfig({ seminarDates: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seminarVenue">Venue</Label>
                <Input
                  id="seminarVenue"
                  value={config.seminarVenue}
                  onChange={(e) => updateConfig({ seminarVenue: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Form Sections & Fields</h2>
            <div className="space-y-6">
              {config.sections.map((section) => (
                <div key={section.id} className="border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-medium text-foreground">{section.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {section.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                      <Switch
                        checked={section.enabled}
                        onCheckedChange={() => toggleSection(section.id)}
                      />
                    </div>
                  </div>
                  
                  {section.enabled && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 ml-8">
                      {section.fields.map((field) => (
                        <div 
                          key={field.id} 
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            field.enabled ? 'bg-accent/30 border-primary/20' : 'bg-muted/30 border-border'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`text-sm ${field.enabled ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {field.label}
                            </span>
                            {field.required && (
                              <Badge variant="outline" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <Switch
                            checked={field.enabled}
                            onCheckedChange={() => toggleField(section.id, field.id)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Fee Categories */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Fee Structure (Date-wise Slabs)</h2>
            
            {/* Fee Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-3 text-left font-semibold text-foreground border-b">Category</th>
                    {config.feeSlabs.map(slab => (
                      <th key={slab.id} className="px-4 py-3 text-center font-semibold text-foreground border-b">
                        {slab.label}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center font-semibold text-foreground border-b">Enabled</th>
                  </tr>
                </thead>
                <tbody>
                  {config.feeCategories.map((category, index) => (
                    <tr key={category.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                      <td className="px-4 py-3 border-b">
                        <Input
                          value={category.name}
                          onChange={(e) => updateFeeCategory(category.id, { name: e.target.value })}
                          className="max-w-[150px]"
                          disabled={!category.enabled}
                        />
                      </td>
                      {config.feeSlabs.map(slab => (
                        <td key={slab.id} className="px-4 py-3 border-b">
                          <Input
                            type="number"
                            value={category.fees[slab.id]}
                            onChange={(e) => updateFeeCategory(category.id, { 
                              fees: { ...category.fees, [slab.id]: Number(e.target.value) }
                            })}
                            className="w-24 mx-auto text-center"
                            disabled={!category.enabled}
                          />
                        </td>
                      ))}
                      <td className="px-4 py-3 border-b text-center">
                        <Switch
                          checked={category.enabled}
                          onCheckedChange={(checked) => updateFeeCategory(category.id, { enabled: checked })}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Consent Text */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">Consent Declaration</h2>
            <Textarea
              value={config.consentText}
              onChange={(e) => updateConfig({ consentText: e.target.value })}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
