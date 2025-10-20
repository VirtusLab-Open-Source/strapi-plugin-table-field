<div align="center" style="max-width: 10rem; margin: 0 auto">
  <img style="width: 150px; height: auto;" src="https://www.sensinum.com/img/open-source/strapi-plugin-power-fields/logo.png" alt="Logo - Strapi Power Fields" />
</div>
<div align="center">
  <h1>Strapi Table Custom Field</h1>
  <p>A custom field which allow to build table structured data sets</p>
  <a href="https://www.npmjs.org/package/@sensinum/strapi-table-field">
    <img alt="NPM version" src="https://img.shields.io/npm/v/@sensinum/strapi-table-field.svg">
  </a>
  <a href="https://www.npmjs.org/package/@sensinum/strapi-table-field">
    <img src="https://img.shields.io/npm/dm/@sensinum/strapi-table-field.svg" alt="Monthly download on NPM" />
  </a>
</div>

---

A Strapi plugin that adds a **custom field** that handles dynamic creation and handling of table structured data sets.

## 📋 Table of Contents

- [✨ Features](#features)
- [📋 Requirements](#requirements)
- [📦 Installation](#installation)
- [🚀 Usage](#usage)
- [💾 Data Structure](#data-structure)
- [👨‍💻 Development & Testing](#development--testing)
- [🔗 Links](#links)
- [💬 Community Support](#community-support)
- [📄 License](#license)

## ✨ Features
- Custom field type for creating table structured data
- Dynamic column management - add/remove columns with labels
- Dynamic row management - add/remove rows
- Editable cells with text input
- Data stored as JSON in Strapi database
- Seamless integration with Strapi Content Types
- Responsive and intuitive UI
- No external dependencies or services required

## 📋 Requirements
- Strapi v5.0.0 or later
- Node.js 18+

## 📦 Installation

```bash
npm install @sensinum/strapi-table-field@latest
# or
yarn add @sensinum/strapi-table-field@latest
```

After installation, the plugin will be automatically available in your Strapi admin panel.

## 🚀 Usage

### Adding Table Field to Content Type

1. Go to **Content-Type Builder** in your Strapi admin panel
2. Select an existing content type or create a new one
3. Click **Add another field**
4. Select **Table** from the **Custom Fields** section
5. Configure the field name and settings
6. Save and restart the server if prompted

### Working with Table Data

Once added to a content type, you can:

- **Add Columns**: Click the `+` button in the column header area
- **Remove Columns**: Click the trash icon on any column header (minimum 1 column required)
- **Add Rows**: Click the "Add row" button below the table
- **Remove Rows**: Click the trash icon on any row (minimum 1 row required)
- **Edit Cells**: Simply click and type in any cell

The table data is automatically saved with your content entry.

## 💾 Data Structure

The table field stores data as JSON with the following structure:

```typescript
{
  columns: [
    {
      label: string,      // Column header label
      type: string,       // Field type (currently 'text')
      required: boolean   // Whether field is required
    }
  ],
  rows: [
    [string, string, ...] // Array of cell values matching column order
  ]
}
```

### Example Data

```json
{
  "columns": [
    { "label": "Name", "type": "text", "required": false },
    { "label": "Age", "type": "text", "required": false },
    { "label": "City", "type": "text", "required": false }
  ],
  "rows": [
    ["John Doe", "30", "New York"],
    ["Jane Smith", "25", "London"],
    ["Bob Johnson", "35", "Paris"]
  ]
}
```

### Accessing Data in API Responses

When you query content with a table field, the data will be included in the response as JSON:

```json
{
  "data": {
    "id": 1,
    "myTableField": {
      "columns": [...],
      "rows": [...]
    }
  }
}
```

## 👨‍💻 Development & Testing

- Build: `yarn build`
- Test backend: `yarn test:server`
- Test frontend: `yarn test:ts:front`
- Watch mode: `yarn watch`

## 🔗 Links

- [Strapi website](http://strapi.io/)

## 💬 Community support

- [GitHub](https://github.com/VirtusLab-Open-Source/strapi-plugin-table-field) (Bug reports, contributions)
  
You can also used official support platform of Strapi, and search `[VirtusLab]` prefixed people (maintainers) 

- [Discord](https://discord.strapi.io) (For live discussion with the Community and Strapi team)
- [Community Forum](https://forum.strapi.io) (Questions and Discussions)

## 📄 License

See the [MIT License](LICENSE) file for licensing information.