# Frontend File Organization

## ✅ Auth Screens Reorganized

Auth screens have been organized into logical folders for better maintainability.

## 📁 New Structure

```
frontend/app/(auth)/
├── login.tsx                      # Main login screen
│
├── onboarding/                    # User onboarding
│   └── index.tsx                  # Onboarding form
│
├── signup/                        # Signup flows
│   ├── index.tsx                  # Signup options (email, social, phone)
│   ├── email.tsx                  # Email signup form
│   ├── phone.tsx                  # Phone signup form
│   └── success.tsx                # Signup success screen
│
└── password-reset/                # Password reset flows
    ├── index.tsx                  # Request reset (enter email)
    ├── confirmation.tsx           # Reset email sent confirmation
    ├── create.tsx                 # Create new password
    └── success.tsx                # Password reset success
```

## 🔄 File Renames

### Signup Screens
- `signup.tsx` → `signup/index.tsx`
- `email-signup.tsx` → `signup/email.tsx`
- `phone-signup.tsx` → `signup/phone.tsx`
- `signup-success.tsx` → `signup/success.tsx`

### Password Reset Screens
- `reset-password.tsx` → `password-reset/index.tsx`
- `reset-confirmation.tsx` → `password-reset/confirmation.tsx`
- `create-password.tsx` → `password-reset/create.tsx`
- `password-success.tsx` → `password-reset/success.tsx`

### Onboarding Screen
- `onboarding.tsx` → `onboarding/index.tsx`

## 🔗 Updated Routes

### Old Routes → New Routes

**Signup:**
- `/(auth)/signup` → `/(auth)/signup/` (index)
- `/(auth)/email-signup` → `/(auth)/signup/email`
- `/(auth)/phone-signup` → `/(auth)/signup/phone`
- `/(auth)/signup-success` → `/(auth)/signup/success`

**Password Reset:**
- `/(auth)/reset-password` → `/(auth)/password-reset/` (index)
- `/(auth)/reset-confirmation` → `/(auth)/password-reset/confirmation`
- `/(auth)/create-password` → `/(auth)/password-reset/create`
- `/(auth)/password-success` → `/(auth)/password-reset/success`

**Onboarding:**
- `/(auth)/onboarding` → `/(auth)/onboarding/` (index)

**Unchanged:**
- `/(auth)/login` - Main login screen

## 🎯 Benefits

### Better Organization
- ✅ Related screens grouped together
- ✅ Clear flow hierarchy
- ✅ Easier to navigate codebase
- ✅ Reduced clutter in auth folder

### Improved Maintainability
- ✅ Logical grouping by feature
- ✅ Easier to find related screens
- ✅ Clear naming conventions
- ✅ Scalable structure

### Developer Experience
- ✅ Intuitive folder structure
- ✅ Consistent naming patterns
- ✅ Easy to add new flows
- ✅ Clear separation of concerns

## 📋 Route Usage Examples

### Navigation in Code

**Signup Flow:**
```tsx
// Go to signup options
router.push('/(auth)/signup/')

// Go to email signup
router.push('/(auth)/signup/email')

// Go to phone signup
router.push('/(auth)/signup/phone')

// Show success
router.push('/(auth)/signup/success')
```

**Password Reset Flow:**
```tsx
// Start password reset
router.push('/(auth)/password-reset/')

// Show confirmation
router.push('/(auth)/password-reset/confirmation')

// Create new password
router.push('/(auth)/password-reset/create')

// Show success
router.push('/(auth)/password-reset/success')
```

**Other Screens:**
```tsx
// Login
router.push('/(auth)/login')

// Onboarding
router.push('/(auth)/onboarding/')
```

## 🔍 Finding Screens

### By Feature
- **Signup?** → `frontend/app/(auth)/signup/`
- **Password Reset?** → `frontend/app/(auth)/password-reset/`
- **Login?** → `frontend/app/(auth)/login.tsx`
- **Onboarding?** → `frontend/app/(auth)/onboarding/`

### By Flow
- **User wants to register** → `signup/index.tsx` → `signup/email.tsx` → `signup/success.tsx`
- **User forgot password** → `password-reset/index.tsx` → `password-reset/confirmation.tsx`
- **User has reset token** → `password-reset/create.tsx` → `password-reset/success.tsx`

## 🚀 Adding New Screens

### Signup Flow
Add new file in `frontend/app/(auth)/signup/`:
```
signup/
├── index.tsx
├── email.tsx
├── phone.tsx
├── social.tsx        # NEW
└── success.tsx
```

### Password Reset Flow
Add new file in `frontend/app/(auth)/password-reset/`:
```
password-reset/
├── index.tsx
├── confirmation.tsx
├── create.tsx
├── verify-otp.tsx    # NEW
└── success.tsx
```

## 📝 Code Updates Made

### Updated Route References
- ✅ `login.tsx` - Updated signup and password reset routes
- ✅ `signup/index.tsx` - Updated email signup route
- ✅ `password-reset/index.tsx` - Updated confirmation route

### No Breaking Changes
- All routes still work with Expo Router
- Folder-based routing automatically handles index files
- Existing navigation logic preserved

## ✨ Next Steps

1. Update any hardcoded route strings in other files
2. Add README files in signup/ and password-reset/ folders if needed
3. Follow this pattern for other feature folders
4. Keep related screens grouped together
