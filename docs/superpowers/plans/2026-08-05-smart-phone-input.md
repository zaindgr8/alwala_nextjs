# Smart Phone Input Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a smart phone input component with global country code selection and auto-detection, integrated across all public and admin forms.

**Architecture:** A standalone `PhoneInput` UI component that manages internal state (selected code + number) but exposes a single combined string to its parent via `onChange`. It supports two visual variants (`minimal` and `boxed`) to match existing design patterns.

**Tech Stack:** React, Tailwind CSS, Lucide React (if icons needed).

## Global Constraints
- Must support all global country codes.
- Must auto-detect country code when user types `+`.
- Must output a combined string: `"+CODE NUMBER"`.
- Must maintain luxury aesthetic (ivory, gold, matte-black colors).
- No changes to backend API endpoints.

---

### Task 1: Core `PhoneInput` Component

**Files:**
- Create: `src/components/ui/PhoneInput.tsx`

**Interfaces:**
- Produces: `PhoneInput({ value, onChange, placeholder, variant, className, required })`
    - `value`: `string` (Combined "+CODE NUMBER")
    - `onChange`: `(value: string) => void`
    - `variant`: `'minimal' | 'boxed'`

- [ ] **Step 1: Implement global country code map**
Create a constant `COUNTRY_CODES` containing all global calling codes and country names.

- [ ] **Step 2: Build component skeleton and internal state**
Implement state for `selectedCode` and `numberPart`. Logic to split the initial `value` prop into these two parts on mount.

- [ ] **Step 3: Implement auto-detection logic**
Write a function that checks if `numberPart` starts with `+` and matches any entry in `COUNTRY_CODES`. If match: update `selectedCode` and strip the prefix from `numberPart`.

- [ ] **Step 4: Implement `minimal` variant styling**
Apply bottom-border only styling: `border-b border-champagne focus:border-gold`. Use `transparent` background.

- [ ] **Step 5: Implement `boxed` variant styling**
Apply rounded-box styling: `bg-luxury-black border border-luxury-border rounded-xl focus:ring-gold-primary/50`.

- [ ] **Step 6: Implement combined output**
Ensure `onChange` is called with `${selectedCode} ${numberPart}` whenever either part changes.

- [ ] **Step 7: Commit**
```bash
git add src/components/ui/PhoneInput.tsx
git commit -m "feat: implement smart PhoneInput component with auto-detection"
```

### Task 2: Integrate into `PropertyInquiryModal`

**Files:**
- Modify: `src/components/properties/PropertyInquiryModal.tsx`

**Interfaces:**
- Consumes: `PhoneInput` from `src/components/ui/PhoneInput`

- [ ] **Step 1: Import `PhoneInput`**

- [ ] **Step 2: Replace existing phone input**
Remove the standard `<input type="tel" ... />` and replace it with `<PhoneInput variant="minimal" ... />`. Map `formData.phone` and `setFormData` to the component's props.

- [ ] **Step 3: Verify functionality**
Check that selecting a code and typing a number results in the correct combined string in `formData.phone`.

- [ ] **Step 4: Commit**
```bash
git add src/components/properties/PropertyInquiryModal.tsx
git commit -m "feat: integrate PhoneInput into PropertyInquiryModal"
```

### Task 3: Integrate into `HeroPopup`

**Files:**
- Modify: `src/components/home/HeroPopup.tsx`

**Interfaces:**
- Consumes: `PhoneInput` from `src/components/ui/PhoneInput`

- [ ] **Step 1: Import `PhoneInput`**

- [ ] **Step 2: Replace existing phone input**
Replace the standard tel input with `<PhoneInput variant="minimal" ... />`.

- [ ] **Step 3: Verify functionality**
Check combined string output in `formData.phone`.

- [ ] **Step 4: Commit**
```bash
git add src/components/home/HeroPopup.tsx
git commit -m "feat: integrate PhoneInput into HeroPopup"
```

### Task 4: Integrate into `BrochureRequest`

**Files:**
- Modify: `src/components/community/BrochureRequest.tsx`

**Interfaces:**
- Consumes: `PhoneInput` from `src/components/ui/PhoneInput`

- [ ] **Step 1: Import `PhoneInput`**

- [ ] **Step 2: Replace existing phone input**
Replace standard tel input with `<PhoneInput variant="minimal" ... />`. (Note: this form uses `ivory/5` background and `ivory/20` borders, the component should adapt or be styled accordingly via `className`).

- [ ] **Step 3: Verify functionality**
Check combined string output in `formData.phone`.

- [ ] **Step 4: Commit**
```bash
git add src/components/community/BrochureRequest.tsx
git commit -m "feat: integrate PhoneInput into BrochureRequest"
```

### Task 5: Integrate into `UserCreationForm` (Admin)

**Files:**
- Modify: `src/components/admin/UserCreationForm.tsx`

**Interfaces:**
- Consumes: `PhoneInput` from `src/components/ui/PhoneInput`

- [ ] **Step 1: Import `PhoneInput`**

- [ ] **Step 2: Replace existing phone input**
Replace standard tel input with `<PhoneInput variant="boxed" ... />`.

- [ ] **Step 3: Verify functionality**
Check combined string output in `formData.phone`.

- [ ] **Step 4: Commit**
```bash
git add src/components/admin/UserCreationForm.tsx
git commit -m "feat: integrate PhoneInput into UserCreationForm"
```

### Task 6: Final End-to-End Verification

**Files:**
- All modified forms

- [ ] **Step 1: Test Auto-Detection**
In any form, type `+968` into the phone field. Verify the dropdown automatically switches to Oman.

- [ ] **Step 2: Test Global Selection**
Select a non-Oman country from the dropdown. Verify the combined string includes the correct code.

- [ ] **Step 3: Verify API Payload**
Submit one form and verify (via network tab or logs) that the `phone` field in the request body is a single string containing both the code and number.

- [ ] **Step 4: Final Commit**
```bash
git commit -m "feat: finalize smart phone input integration across all forms"
```
