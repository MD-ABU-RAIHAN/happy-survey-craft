# Distribution Components

This directory contains all components related to the Distribution feature of the survey builder, including various distribution methods and shared UI components.

## 📁 Directory Structure

```
distribution/
├── DistributionTab.tsx           # Main distribution tab component
├── README.md                     # This file
├── index.ts                      # Main exports
│
├── methods/                      # Distribution Method Components
│   ├── dedicated-survey-pagey/           # Branded Survey (Custom URL)
│   │   ├── BrandedSurveySettings.tsx
│   │   ├── components/
│   │   │   ├── ButtonCustomization.tsx
│   │   │   ├── IntegratedCustomization.tsx
│   │   │   ├── LogoSettings.tsx
│   │   │   ├── SectionCustomization.tsx
│   │   │   ├── SurveyUrlSection.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── post-purchase/            # Post-Purchase Survey
│   │   ├── PostPurchaseSettings.tsx
│   │   ├── components/
│   │   │   ├── AppearanceSettings.tsx
│   │   │   ├── DisplaySettings.tsx
│   │   │   ├── PageLocationSettings.tsx
│   │   │   ├── SideLogo.tsx
│   │   │   ├── UserTargeting.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── exit-intent/              # Exit-Intent Popup
│   │   ├── ExitIntentSettings.tsx
│   │   └── index.ts
│   │
│   ├── email-campaign/           # Email Campaign
│   │   ├── EmailCampaignSettings.tsx
│   │   └── index.ts
│   │
│   ├── on-site-popup/            # On-Site Popup
│   │   ├── OnSitePopupSettings.tsx
│   │   └── index.ts
│   │
│   └── index.ts
│
└── shared/                       # Shared UI Components
    ├── ColorPicker.tsx
    ├── DefaultDistributionSettings.tsx
    ├── DistributionItem.tsx
    ├── FileUpload.tsx
    ├── LogoSettings.tsx
    ├── QuillEditor.tsx
    ├── SectionCard.tsx
    ├── UploadInput.tsx
    ├── UserTargeting.tsx
    └── index.ts
```

## 🚀 Usage

### Importing the Main Component

```typescript
// Import the main DistributionTab
import { DistributionTab } from "@/components/survey-builder/distribution";

// Use it in your component
<DistributionTab
  distributionTypes={distributionTypes}
  enabledDistributions={enabledDistributions}
  expandedDistributionId={expandedDistributionId}
  distributionSettings={distributionSettings}
  brandedSurveySettings={brandedSurveySettings}
  postPurchaseSettings={postPurchaseSettings}
  exitIntentSettings={exitIntentSettings}
  emailCampaignSettings={emailCampaignSettings}
  onSitePopupSettings={onSitePopupSettings}
  onToggleDistribution={toggleDistribution}
  onToggleCollapsed={toggleCollapsed}
  onUpdateDistributionSetting={updateDistributionSetting}
  onBrandedSurveySettingsChange={handleBrandedSettingsChange}
  onPostPurchaseSettingsChange={handlePostPurchaseChange}
  onExitIntentSettingsChange={handleExitIntentChange}
  onEmailCampaignSettingsChange={handleEmailCampaignChange}
  onOnSitePopupSettingsChange={handleOnSitePopupChange}
  onResetToDefault={resetToDefault}
  onGenerateNewUrl={generateNewUrl}
  onCopyUrl={copyUrl}
  copiedUrl={copiedUrl}
/>;
```

### Importing Distribution Methods

```typescript
// Import specific distribution method components
import {
  BrandedSurveySettings,
  PostPurchaseSettings,
  ExitIntentSettings,
  EmailCampaignSettings,
  OnSitePopupSettings,
} from "@/components/survey-builder/distribution/methods";

// Or import from specific method
import { BrandedSurveySettings } from "@/components/survey-builder/distribution/methods/dedicated-survey-pagey";
```

### Importing Shared Components

```typescript
// Import shared components
import {
  ColorPicker,
  FileUpload,
  LogoSettings,
  QuillEditor,
  UserTargeting,
} from "@/components/survey-builder/distribution/shared";

// Use in your component
<ColorPicker color={selectedColor} onChange={handleColorChange} />;
```

## 🎯 Distribution Methods

### 1. **Branded Survey**

Custom branded surveys with full customization options.

**Features:**

- Custom domain and URL configuration
- Logo settings (header and side)
- Button customization (colors, hover states, shadow)
- Section customization (colors, gradients, background images)
- Progress bar configuration
- Custom CSS support

**Component:** `BrandedSurveySettings`

### 2. **Post-Purchase Survey**

Surveys triggered after customer purchase.

**Features:**

- User targeting (all users or segments)
- User tag filtering
- New vs returning customer targeting
- Product purchase targeting
- Display settings (timing, position)
- Page location settings
- Appearance customization

**Component:** `PostPurchaseSettings`

### 3. **Exit-Intent Popup**

Surveys triggered when user attempts to leave the site.

**Features:**

- Exit detection sensitivity
- Trigger delay settings
- Display customization
- Frequency capping

**Component:** `ExitIntentSettings`

### 4. **Email Campaign**

Survey distribution via email campaigns.

**Features:**

- Email template customization
- Subject line and preview text
- Sender information
- Scheduling options
- Recipient targeting

**Component:** `EmailCampaignSettings`

### 5. **On-Site Popup**

Surveys displayed as popups on the website.

**Features:**

- Trigger conditions (time-based, scroll-based, etc.)
- Display position and animation
- Frequency settings
- Device targeting
- A/B testing support

**Component:** `OnSitePopupSettings`

## 🛠️ Shared Components

### ColorPicker

Advanced color picker with preset colors and custom color support.

```typescript
<ColorPicker
  color="#3B82F6"
  onChange={(color) => console.log(color)}
  presets={["#3B82F6", "#EF4444", "#10B981"]}
/>
```

### FileUpload

Drag-and-drop file upload component with preview.

```typescript
<FileUpload
  accept="image/*"
  maxSize={5 * 1024 * 1024} // 5MB
  onUpload={(file) => handleFileUpload(file)}
/>
```

### LogoSettings

Logo configuration component with size and position controls.

```typescript
<LogoSettings
  enabled={true}
  url="https://example.com/logo.png"
  width={200}
  height={50}
  onChange={(settings) => handleLogoChange(settings)}
/>
```

### QuillEditor

Rich text editor based on Quill with custom toolbar.

```typescript
<QuillEditor
  value={content}
  onChange={(value) => setContent(value)}
  placeholder="Enter description..."
/>
```

### UserTargeting

User segmentation and targeting component.

```typescript
<UserTargeting
  type="segment-users"
  selectedTags={["vip", "frequent-buyer"]}
  newCustomer={true}
  returningCustomer={false}
  onChange={(targeting) => handleTargetingChange(targeting)}
/>
```

### DistributionItem

Collapsible card component for distribution methods.

```typescript
<DistributionItem
  distribution={distributionType}
  isEnabled={true}
  isExpanded={false}
  onToggle={() => toggle()}
  onToggleCollapse={() => toggleCollapse()}
>
  <YourSettingsComponent />
</DistributionItem>
```

## 📋 Component Architecture

### Separation of Concerns

1. **Main Tab Component** (`DistributionTab.tsx`)

   - Manages overall state
   - Handles distribution method switching
   - Coordinates between different distribution types

2. **Method Components** (`methods/`)

   - Self-contained distribution method settings
   - Each method has its own folder with sub-components
   - Isolated concerns for better maintainability

3. **Shared Components** (`shared/`)
   - Reusable UI components
   - Common functionality across distribution methods
   - Promotes DRY principles

## 🔧 Development Guidelines

### Adding a New Distribution Method

1. **Create method folder:**

   ```bash
   mkdir -p methods/new-method/components
   ```

2. **Create main settings component:**

   ```typescript
   // methods/new-method/NewMethodSettings.tsx
   import React from "react";

   interface NewMethodSettings {
     // Define your settings interface
   }

   interface Props {
     settings: NewMethodSettings;
     onSettingsChange: (settings: NewMethodSettings) => void;
   }

   const NewMethodSettings: React.FC<Props> = ({
     settings,
     onSettingsChange,
   }) => {
     return <div>{/* Your settings UI */}</div>;
   };

   export default NewMethodSettings;
   ```

3. **Create index file:**

   ```typescript
   // methods/new-method/index.ts
   export { default as NewMethodSettings } from "./NewMethodSettings";
   ```

4. **Update methods index:**

   ```typescript
   // methods/index.ts
   export * from "./new-method";
   ```

5. **Add to DistributionTab:**
   - Import the new method component
   - Add case in `renderDistributionContent()`
   - Add to distribution types array

### Adding Shared Components

1. Create component in `shared/` folder
2. Export from `shared/index.ts`
3. Use in any distribution method or tab

### Best Practices

- ✅ Keep components focused and single-responsibility
- ✅ Use TypeScript for type safety
- ✅ Extract reusable logic to shared components
- ✅ Follow existing naming conventions
- ✅ Add proper JSDoc comments
- ✅ Update index files when adding new components

## 🎨 Styling

All components use:

- **Tailwind CSS** for styling
- **Shadcn UI** components for consistency
- **Lucide React** for icons

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Build
npm run build

# Run tests (when available)
npm test
```

## 📚 Related Files

- **Main Survey Builder:** [`@/pages/SurveyBuilder.tsx`](../../../pages/SurveyBuilder.tsx)
- **Question Builder:** [`@/components/QuestionBuilder.tsx`](../../QuestionBuilder.tsx)
- **Survey Preview:** [`@/components/SurveyPreview.tsx`](../../SurveyPreview.tsx)

## 🤝 Contributing

When adding or modifying distribution components:

1. **Follow the directory structure** - Keep related files together
2. **Update index files** - Ensure new components are exported
3. **Maintain type safety** - Use TypeScript interfaces
4. **Document changes** - Update this README when adding features
5. **Test thoroughly** - Verify changes don't break existing functionality

## 📝 Migration Notes

**Previous Structure → New Structure:**

```
❌ Old (Flat Structure)
survey-builder/
├── DistributionTabRefactored.tsx
├── BrandedSurveySettingsRefactored.tsx
├── PostPurchaseSettingsRefactored.tsx
├── ExitIntentSettingsRefactored.tsx
├── EmailCampaignSettingsRefactored.tsx
├── OnSitePopupSettingsRefactored.tsx
├── branded/ (mixed components)
├── post-purchase/ (mixed components)
└── shared/ (mixed components)

✅ New (Organized Structure)
survey-builder/distribution/
├── DistributionTab.tsx
├── methods/
│   ├── dedicated-survey-pagey/
│   ├── post-purchase/
│   ├── exit-intent/
│   ├── email-campaign/
│   └── on-site-popup/
└── shared/
```

**Import Changes:**

```typescript
// Before
import DistributionTabRefactored from "@/components/survey-builder/DistributionTabRefactored";
import BrandedSurveySettingsRefactored from "@/components/survey-builder/BrandedSurveySettingsRefactored";

// After
import { DistributionTab } from "@/components/survey-builder/distribution";
import { BrandedSurveySettings } from "@/components/survey-builder/distribution/methods";
```

## 🔍 Quick Reference

| Distribution Method | Component               | Primary Use Case                         |
| ------------------- | ----------------------- | ---------------------------------------- |
| **Branded Survey**  | `BrandedSurveySettings` | Custom branded surveys with full control |
| **Post-Purchase**   | `PostPurchaseSettings`  | After-checkout feedback collection       |
| **Exit-Intent**     | `ExitIntentSettings`    | Capture feedback before user leaves      |
| **Email Campaign**  | `EmailCampaignSettings` | Email-based survey distribution          |
| **On-Site Popup**   | `OnSitePopupSettings`   | Active engagement on website             |

---

**Last Updated:** 2025-10-02
**Maintained By:** Survey Builder Team
