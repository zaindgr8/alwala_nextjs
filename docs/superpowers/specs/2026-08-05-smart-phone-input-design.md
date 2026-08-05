# Smart Phone Input Design

## Overview
Improve the phone number input across the application by introducing a smart country code selector. This replaces standard text inputs with a composite component that handles global country codes and auto-detects codes based on user input.

## Goals
- Prevent "mixed up" phone numbers by enforcing a structured format.
- Provide a global list of country codes.
- Automatically update the selected country when a user types a valid country code.
- Maintain the luxury aesthetic of the application.
- Output a single, combined string to the backend to avoid API changes.

## Component Specification: `PhoneInput`

### Props
- `value`: `string` (The combined phone number, e.g., "+968 91234567")
- `onChange`: `(value: string) => void` (Callback for the combined string)
- `placeholder`: `string` (Custom placeholder for the number part)
- `variant`: `'minimal' | 'boxed'` (Styling variant)
- `className`: `string` (Additional classes for the wrapper)
- `required`: `boolean` (Whether the field is required)

### Internal Logic
- **State Management**: The component will internally track the `selectedCode` (e.g., "+968") and the `phoneNumber` (the digits following the code).
- **Global Code Map**: A comprehensive mapping of country names to calling codes will be used.
- **Auto-Detection**: 
    - As the user types in the `phoneNumber` field, the component will check if the input starts with a `+` followed by numbers.
    - If a match is found in the global code map, the `selectedCode` state will be updated to match.
    - The redundant code will be stripped from the `phoneNumber` input to prevent duplication.
- **Combined Output**: On every change, the component will emit `selectedCode + " " + phoneNumber` to the parent `onChange` handler.

### Visual Design

#### `minimal` variant (Popups)
- Shared bottom border (`border-b`).
- Background: `transparent`.
- Transition: Focuses on the `gold` border color.
- Layout: `select` and `input` aligned on the same baseline.

#### `boxed` variant (Admin Panel)
- Shared rounded border (`rounded-xl`).
- Background: `bg-luxury-black`.
- Transition: Focuses on the `gold-primary` ring.
- Layout: A unified box containing both the selector and the input.

## Implementation Plan

1. **Create `src/components/ui/PhoneInput.tsx`**: Implement the logic, the global code map, and the two styling variants.
2. **Integrate into `PropertyInquiryModal`**: Replace the tel input.
3. **Integrate into `HeroPopup`**: Replace the tel input.
4. **Integrate into `BrochureRequest`**: Replace the tel input.
5. **Integrate into `UserCreationForm`**: Replace the tel input.
6. **Verify**: Ensure the combined string is correctly sent to `/api/admin/leads` and `/api/admin/users`.
