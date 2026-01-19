# 📘 Admin Guide: Delegate Categories Management

## 🎯 Kaise Use Karein

### Step 1: Admin Panel Me Login Karein
```
URL: http://localhost:5173/admin/login
```

### Step 2: Fee Structure Tab Me Jaayein
```
Admin Dashboard → Fee Structure Tab
```

### Step 3: Delegate Categories Section Dekhein
```
Page scroll karein → "Delegate Categories" section milega
```

---

## 🎨 Interface Overview

### Main Section:
```
┌─────────────────────────────────────────────────────┐
│  👥 Delegate Categories                  [+ Add]    │
│  Manage delegate types for registration             │
├─────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────┐ │
│  │ BOA MEMBER              [Requires Membership] │ │
│  │ Value: boa-member                      [✏️] [🗑️] │ │
│  │ For registered BOA members...                 │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ NON BOA MEMBER                                │ │
│  │ Value: non-boa-member                  [✏️] [🗑️] │ │
│  │ For non-members or general participants       │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ ACCOMPANYING PERSON                           │ │
│  │ Value: accompanying-person             [✏️] [🗑️] │ │
│  │ For accompanying persons (spouse, family...)  │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## ➕ Add New Category

### Click "Add Category" Button

**Form Fields:**

1. **Name (Value)** *
   - Example: `student`
   - Lowercase with hyphens
   - Used internally in system

2. **Label (Display)** *
   - Example: `STUDENT`
   - Uppercase, user-facing
   - Shows in registration form

3. **Description**
   - Example: `For student participants with valid ID`
   - Optional, helps users understand

4. **Requires BOA Membership Number**
   - ☑️ Check if membership verification needed
   - ☐ Uncheck for general categories

5. **Display Order**
   - Number: 0, 1, 2, 3...
   - Lower numbers appear first
   - Auto-set to next available

**Example:**
```
Name: student
Label: STUDENT
Description: For student participants with valid student ID
Requires Membership: ☐ No
Display Order: 4
```

---

## ✏️ Edit Category

1. Click **Edit** button (pencil icon)
2. Form opens with current values
3. Make changes
4. Click **Update Category**

**Common Edits:**
- Change label text
- Update description
- Toggle membership requirement
- Adjust display order

---

## 🗑️ Delete Category

1. Click **Delete** button (trash icon)
2. Confirmation dialog appears
3. Click **OK** to confirm

**⚠️ Note:**
- Cannot delete if category is used in registrations
- System will show error message
- Safe to delete unused categories

---

## 🎯 Use Cases

### 1. Add Student Category
```
Name: student
Label: STUDENT
Description: For medical students with valid ID
Requires Membership: No
Display Order: 4
```

### 2. Add Faculty Category
```
Name: faculty
Label: FACULTY
Description: For teaching faculty members
Requires Membership: No
Display Order: 5
```

### 3. Add International Delegate
```
Name: international-delegate
Label: INTERNATIONAL DELEGATE
Description: For delegates from outside India
Requires Membership: No
Display Order: 6
```

### 4. Add Life Member
```
Name: life-member
Label: LIFE MEMBER
Description: For BOA life members
Requires Membership: Yes
Display Order: 0
```

---

## 📊 Best Practices

### Naming Convention:
- **Name**: lowercase-with-hyphens
- **Label**: UPPERCASE WITH SPACES
- Keep names short and descriptive

### Display Order:
```
0 - Most important (e.g., Life Member)
1 - BOA Member
2 - Non BOA Member
3 - Accompanying Person
4+ - Additional categories
```

### Membership Requirement:
- ✅ Check for: BOA Members, Life Members
- ❌ Uncheck for: Students, Faculty, Accompanying Persons

---

## 🔄 How Changes Reflect

### Immediate Effect:
```
Admin Panel (Add/Edit/Delete)
         ↓
    Database Updated
         ↓
Registration Page (Auto-refresh)
         ↓
Users See New Categories
```

### Timeline:
- **Admin saves**: Instant
- **Database update**: < 1 second
- **Frontend refresh**: On next page load
- **User sees**: Immediately on registration page

---

## 🧪 Testing Your Changes

### After Adding/Editing:

1. **Open Registration Page**
   ```
   http://localhost:5173/seminars/4/register
   ```

2. **Go to Delegate Selection Step**
   - Fill personal info
   - Fill address
   - Check "Registration" step

3. **Verify Category Appears**
   - New category should be in dropdown
   - Label should match what you entered
   - Order should be correct

---

## ⚠️ Common Issues

### Category Not Showing?
- ✅ Check if `is_enabled` is TRUE
- ✅ Verify seminar ID is correct
- ✅ Refresh registration page
- ✅ Check browser console for errors

### Cannot Delete?
- ✅ Check if category is used in registrations
- ✅ View registrations table
- ✅ Reassign registrations to different category first

### Wrong Order?
- ✅ Edit category
- ✅ Change display_order value
- ✅ Lower numbers appear first

---

## 📱 Mobile View

Categories also work on mobile:
- Responsive design
- Touch-friendly buttons
- Scrollable list
- Same functionality

---

## 🎓 Training Tips

### For New Admins:
1. Start with viewing existing categories
2. Try editing a description (safe change)
3. Add a test category
4. Check registration page
5. Delete test category

### For Advanced Users:
- Plan category structure before adding
- Use consistent naming conventions
- Document special requirements
- Keep descriptions clear and concise

---

## 📞 Need Help?

**Common Questions:**

**Q: Can I have different categories for different seminars?**
A: Yes! Each seminar has its own set of categories.

**Q: What happens to old registrations if I delete a category?**
A: System prevents deletion if category is in use.

**Q: Can I reorder categories?**
A: Yes! Edit the display_order field.

**Q: How many categories can I add?**
A: No limit, but keep it reasonable (5-10 recommended).

---

## ✅ Checklist

Before going live:
- [ ] All required categories added
- [ ] Labels are clear and professional
- [ ] Descriptions are helpful
- [ ] Membership flags are correct
- [ ] Display order makes sense
- [ ] Tested on registration page
- [ ] Mobile view checked

---

**Happy Managing! 🎉**

*Last Updated: January 18, 2026*
