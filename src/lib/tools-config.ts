import { Hash, FileText, Key, FileDown, Shield, Link, Palette, Clock, Type, Eye, QrCode, Binary, FileCode, Search } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ToolConfig {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const toolsConfig: ToolConfig[] = [
  {
    id: "bcrypt",
    title: "Bcrypt Hash Generator",
    description: "Generate and verify bcrypt hashes for password security",
    icon: Hash,
    href: "/tools/bcrypt",
    seo: {
      title: "Bcrypt Hash Generator - Secure Password Hashing Tool",
      description: "Generate and verify bcrypt hashes online. Secure password hashing with customizable salt rounds. Free bcrypt hash generator for developers and security professionals.",
      keywords: ["bcrypt", "hash generator", "password hashing", "salt", "security", "bcrypt online", "password hash", "encryption"]
    }
  },
  {
    id: "base64",
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode text or data using Base64 encoding",
    icon: FileText,
    href: "/tools/base64",
    seo: {
      title: "Base64 Encoder/Decoder - Online Base64 Conversion Tool",
      description: "Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 to text. Support for file uploads and binary data conversion.",
      keywords: ["base64", "encoder", "decoder", "base64 online", "text encoding", "binary conversion", "base64 converter", "encode decode"]
    }
  },
  {
    id: "jwt",
    title: "JWT Encoder/Decoder",
    description: "Encode, decode, and verify JSON Web Tokens",
    icon: Key,
    href: "/tools/jwt",
    seo: {
      title: "JWT Encoder/Decoder - JSON Web Token Tool",
      description: "Create, decode, and verify JSON Web Tokens (JWT) online. Support for HS256, HS384, HS512 algorithms. Free JWT debugger and token generator for developers.",
      keywords: ["jwt", "json web token", "jwt decoder", "jwt encoder", "token generator", "jwt debugger", "HS256", "authentication"]
    }
  },
  {
    id: "google-drive",
    title: "Google Drive Link Generator",
    description: "Convert Google Drive sharing links to direct download links",
    icon: FileDown,
    href: "/tools/google-drive",
    seo: {
      title: "Google Drive Direct Link Generator - Convert Sharing Links",
      description: "Convert Google Drive sharing links to direct download links. Generate direct URLs for Google Drive files, images, and documents for embedding and hotlinking.",
      keywords: ["google drive", "direct link", "download link", "google drive converter", "file sharing", "hotlink", "embed", "direct download"]
    }
  },
  {
    id: "password",
    title: "Password Generator",
    description: "Generate secure, customizable passwords with advanced options",
    icon: Shield,
    href: "/tools/password",
    seo: {
      title: "Password Generator - Create Strong Secure Passwords",
      description: "Generate strong, secure passwords with customizable options. Create random passwords with numbers, symbols, uppercase, lowercase letters. Free password generator tool.",
      keywords: ["password generator", "strong password", "secure password", "random password", "password creator", "password maker", "cybersecurity", "password strength"]
    }
  },
  {
    id: "url",
    title: "URL Encoder/Decoder",
    description: "Encode and decode URLs and URL components for web development",
    icon: Link,
    href: "/tools/url",
    seo: {
      title: "URL Encoder/Decoder - Online URL Encoding Tool",
      description: "Free online URL encoder and decoder. Convert text to URL-safe format and decode URL-encoded strings. Essential tool for web developers and API integration.",
      keywords: ["url encoder", "url decoder", "percent encoding", "url encoding", "uri encoding", "web development", "url converter", "percent decode"]
    }
  },
  {
    id: "color",
    title: "Color Converter",
    description: "Convert between different color formats (HEX, RGB, HSL, etc.)",
    icon: Palette,
    href: "/tools/color",
    seo: {
      title: "Color Converter - Convert HEX, RGB, HSL Color Formats",
      description: "Free online color converter tool. Convert between HEX, RGB, HSL, and other color formats. Perfect for web developers, designers, and digital artists.",
      keywords: ["color converter", "hex to rgb", "rgb to hsl", "color picker", "color format", "hex color", "rgb color", "hsl color", "color tool", "web colors"]
    }
  },
  {
    id: "timestamp",
    title: "Timestamp Converter",
    description: "Convert Unix timestamps to human-readable dates and vice versa",
    icon: Clock,
    href: "/tools/timestamp",
    seo: {
      title: "Timestamp Converter - Unix Timestamp to Date Converter",
      description: "Convert Unix timestamps to human-readable dates and dates to Unix timestamps. Real-time timestamp converter with multiple formats and timezone support.",
      keywords: ["timestamp converter", "unix timestamp", "epoch time", "date converter", "timestamp to date", "unix time", "epoch converter", "time converter", "timestamp tool"]
    }
  },
  {
    id: "lorem",
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs and layouts",
    icon: Type,
    href: "/tools/lorem",
    seo: {
      title: "Lorem Ipsum Generator - Create Placeholder Text",
      description: "Generate Lorem Ipsum placeholder text online. Create custom paragraphs, words, and sentences for your design mockups and layouts. Free Lorem Ipsum text generator.",
      keywords: ["lorem ipsum", "placeholder text", "dummy text", "text generator", "lorem ipsum generator", "design mockup", "placeholder content", "filler text", "sample text"]
    }
  },
  {
    id: "markdown",
    title: "Markdown Preview",
    description: "Preview and format markdown with live rendering and prettier",
    icon: Eye,
    href: "/tools/markdown",
    seo: {
      title: "Markdown Preview - Live Markdown Editor and Renderer",
      description: "Live markdown preview and editor with formatting support. Preview markdown with syntax highlighting, prettier formatting, and real-time rendering. Free markdown editor tool.",
      keywords: ["markdown", "markdown preview", "markdown editor", "live preview", "markdown formatter", "prettier", "markdown renderer", "md preview", "markdown parser"]
    }
  },
  {
    id: "qr-code",
    title: "QR Code Generator",
    description: "Generate customizable QR codes with various design and download options",
    icon: QrCode,
    href: "/tools/qr-code",
    seo: {
      title: "QR Code Generator - Create Custom QR Codes Online",
      description: "Free online QR code generator with customization options. Create QR codes for URLs, text, WiFi, contact info, and more. Download as PNG, SVG, or PDF with custom colors and sizes.",
      keywords: ["qr code generator", "qr code creator", "custom qr code", "qr code online", "generate qr code", "qr code maker", "barcode generator", "qr scanner", "wifi qr code", "vcard qr code"]
    }
  },
  {
    id: "hash",
    title: "Hash Generator",
    description: "Generate cryptographic hashes using various algorithms (MD5, SHA-1, SHA-256, SHA-512, SHA-3)",
    icon: Binary,
    href: "/tools/hash",
    seo: {
      title: "Hash Generator - Create Cryptographic Hashes Online",
      description: "Free online hash generator tool. Create MD5, SHA-1, SHA-256, SHA-512, and SHA-3 hashes from text or hexadecimal data. Secure hash function calculator for developers and security professionals.",
      keywords: ["hash generator", "md5 hash", "sha256 hash", "sha512 hash", "sha3 hash", "cryptographic hash", "hash calculator", "hash function", "checksum generator", "data integrity", "hash online", "crypto hash"]
    }
  },
  {
    id: "json",
    title: "JSON Formatter/Validator",
    description: "Format, validate, and minify JSON data with syntax highlighting and error detection",
    icon: FileCode,
    href: "/tools/json",
    seo: {
      title: "JSON Formatter/Validator - Format, Validate & Minify JSON Online",
      description: "Free online JSON formatter and validator tool. Format JSON with proper indentation, validate JSON syntax, and minify JSON for production. Essential tool for developers working with JSON data.",
      keywords: ["json formatter", "json validator", "json minifier", "json prettifier", "json parser", "format json", "validate json", "minify json", "json syntax", "json online", "json tool", "pretty print json"]
    }
  },
  {
    id: "regex",
    title: "Regular Expression Tester",
    description: "Test and debug regex patterns with live matching and group visualization",
    icon: Search,
    href: "/tools/regex",
    seo: {
      title: "Regular Expression Tester - Test Regex Patterns Online",
      description: "Free online regex tester and debugger. Test regular expressions with live matching, group visualization, and common pattern examples. Essential tool for developers working with regex.",
      keywords: ["regex tester", "regular expression", "regex online", "regex debugger", "pattern matching", "regex validator", "regex examples", "regex syntax", "regex groups", "regex flags"]
    }
  }
];

// Helper function to get tool config for navigation (used in layout)
export const getToolsForNavigation = () => {
  return toolsConfig.map(tool => ({
    title: tool.title,
    description: tool.description,
    url: tool.href,
    icon: tool.icon
  }));
};

// Helper function to get tool config by ID
export const getToolById = (id: string): ToolConfig | undefined => {
  return toolsConfig.find(tool => tool.id === id);
};
