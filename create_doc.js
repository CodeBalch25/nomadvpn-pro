const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, LevelFormat, BorderStyle, WidthType, 
        ShadingType, PageNumber, HeadingLevel, ExternalHyperlink } = require('docx');
const fs = require('fs');

// Colors and styles
const primaryColor = "1E3A5F";
const accentColor = "2E5077";
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: primaryColor, font: "Arial" },
        paragraph: { spacing: { before: 0, after: 240 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: primaryColor, font: "Arial" },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: accentColor, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: "333333", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "week1-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "week2-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "tier1-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "tier2-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "tier3-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({ 
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "NomadVPN Pro - Marketing Plan", color: "666666", size: 20 })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Page ", size: 20 }), new TextRun({ children: [PageNumber.CURRENT], size: 20 }), new TextRun({ text: " of ", size: 20 }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 20 })]
      })] })
    },
    children: [
      // Title
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("NomadVPN Pro")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 480 }, children: [new TextRun({ text: "Marketing Strategy & Launch Playbook", size: 28, color: "666666" })] }),
      
      // Executive Summary
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Executive Summary")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("Your unique positioning: "), new TextRun({ text: "Enterprise-tested residential VPN setup service", bold: true }), new TextRun(" - the only provider offering pre-configured hardware with zero detection across Fortune 500 telecom, retail, and government networks.")] }),
      
      // Market Opportunity Table
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Market Opportunity")] }),
      new Table({
        columnWidths: [4680, 2340, 2340],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Market Segment", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Current Size", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2034 Projection", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("US Digital Nomads")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("18.1 Million")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Growing 147%")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("WireGuard VPN Router Market")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("$1.2 Billion")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("$4.6B (16.2% CAGR)")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Digital Nomad Services")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("$34.12 Billion")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("$235.3B (21.3% CAGR)")] })] })
          ]})
        ]
      }),
      
      // Your Competitive Advantage
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Your Competitive Advantage")] }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: "Validated Enterprise Credentials:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Fortune 500 Telecom (AT&T/DIRECTV) - Zero detection")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Nike Corporate VPN - Zero detection")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("State Government Agency (Texas) - Zero detection")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Comcast Enterprise - Zero detection")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("50+ countries tested over 3+ years")] }),
      
      new Paragraph({ spacing: { before: 200, after: 120 }, children: [new TextRun({ text: "Why You Beat Competitors:", bold: true })] }),
      new Table({
        columnWidths: [3120, 3120, 3120],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "2E5077", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Competitor", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "2E5077", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Their Limitation", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "2E5077", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Your Advantage", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("NordVPN/ExpressVPN")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Data center IPs detected")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Residential IP - unblockable")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("DIY (Raspberry Pi)")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Requires Linux expertise")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Turnkey plug-and-play")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("IT Consultants")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("No specialized expertise")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("3+ years proven track record")] })] })
          ]})
        ]
      }),
      
      // Service Tiers
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Service Tiers")] }),
      new Table({
        columnWidths: [2340, 1560, 4680, 780],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Service", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Price", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Includes", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Margin", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Essential Setup", bold: true })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("$699")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Flint 2 + Beryl AX, WireGuard setup, 30-day support")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("~55%")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Premium + Support", bold: true })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("$1,299")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Essential + 6 months managed support")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("~65%")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Remote VPN Access", bold: true })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("$35-50/mo")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Pre-programmed router shipped, connects to your infrastructure")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("~90%")] })] })
          ]})
        ]
      }),

      // Marketing Channels
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Marketing Channels (Priority Order)")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Tier 1: High-Impact, Low-Cost (Start Here)")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("1. Reddit Marketing")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Target Subreddits:", bold: true })] }),
      new Paragraph({ numbering: { reference: "tier1-list", level: 0 }, children: [new TextRun("r/digitalnomad (2M+ members) - Primary target")] }),
      new Paragraph({ numbering: { reference: "tier1-list", level: 0 }, children: [new TextRun("r/GlInet (15K members) - Highly relevant, receptive")] }),
      new Paragraph({ numbering: { reference: "tier1-list", level: 0 }, children: [new TextRun("r/VPN (500K members) - Technical audience")] }),
      new Paragraph({ numbering: { reference: "tier1-list", level: 0 }, children: [new TextRun("r/remotework (400K members) - Your target customers")] }),
      
      new Paragraph({ spacing: { before: 150, after: 100 }, children: [new TextRun({ text: "Content Strategy:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Educational stories sharing your experience (best ROI)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Problem-solution posts explaining residential vs commercial VPN")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Monthly AMA sessions")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "10:1 ratio: 10 helpful comments for every promotional post", italics: true })] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("2. YouTube Content")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Video Ideas (by search volume):", bold: true })] }),
      new Paragraph({ numbering: { reference: "tier2-list", level: 0 }, children: [new TextRun("\"GL.iNet Flint 2 Complete Setup - WireGuard VPN Server\"")] }),
      new Paragraph({ numbering: { reference: "tier2-list", level: 0 }, children: [new TextRun("\"Best Travel Router 2025 - GL.iNet Beryl AX Review\"")] }),
      new Paragraph({ numbering: { reference: "tier2-list", level: 0 }, children: [new TextRun("\"Why Commercial VPNs Fail for Remote Work\"")] }),
      new Paragraph({ numbering: { reference: "tier2-list", level: 0 }, children: [new TextRun("\"Work From Anywhere Setup Guide - Digital Nomad VPN\"")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("3. GL.iNet Partnership")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Action Items:", bold: true })] }),
      new Paragraph({ numbering: { reference: "tier3-list", level: 0 }, children: [new TextRun("Apply for Affiliate Program (10% commission)")] }),
      new Paragraph({ numbering: { reference: "tier3-list", level: 0 }, children: [new TextRun("Apply for Reseller Program (15-25% wholesale discount)")] }),
      new Paragraph({ numbering: { reference: "tier3-list", level: 0 }, children: [new TextRun("Get listed on \"Where to Buy\" page (free leads)")] }),
      new Paragraph({ numbering: { reference: "tier3-list", level: 0 }, children: [new TextRun("Access GoodCloud for white-label monitoring")] }),
      
      // 90-Day Timeline
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("90-Day Launch Timeline")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Week 1-2: Foundation")] }),
      new Paragraph({ numbering: { reference: "week1-list", level: 0 }, children: [new TextRun("Apply GL.iNet affiliate program")] }),
      new Paragraph({ numbering: { reference: "week1-list", level: 0 }, children: [new TextRun("Apply GL.iNet reseller program")] }),
      new Paragraph({ numbering: { reference: "week1-list", level: 0 }, children: [new TextRun("Create dedicated Reddit account")] }),
      new Paragraph({ numbering: { reference: "week1-list", level: 0 }, children: [new TextRun("Start commenting helpfully on r/digitalnomad, r/GlInet (10+ comments)")] }),
      new Paragraph({ numbering: { reference: "week1-list", level: 0 }, children: [new TextRun("Create lead magnet PDF")] }),
      new Paragraph({ numbering: { reference: "week1-list", level: 0 }, children: [new TextRun("Set up email capture (ConvertKit free tier)")] }),
      new Paragraph({ numbering: { reference: "week1-list", level: 0 }, children: [new TextRun("Join GL.iNet forum, introduce yourself")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Week 3-4: Content Launch")] }),
      new Paragraph({ numbering: { reference: "week2-list", level: 0 }, children: [new TextRun("Draft and post first Reddit educational content")] }),
      new Paragraph({ numbering: { reference: "week2-list", level: 0 }, children: [new TextRun("Script and record first YouTube video")] }),
      new Paragraph({ numbering: { reference: "week2-list", level: 0 }, children: [new TextRun("First blog post live (SEO-optimized)")] }),
      new Paragraph({ numbering: { reference: "week2-list", level: 0 }, children: [new TextRun("Email sequence automated")] }),
      new Paragraph({ numbering: { reference: "week2-list", level: 0 }, children: [new TextRun("Collect testimonials from early conversations")] }),

      // Success Metrics
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Success Metrics")] }),
      new Table({
        columnWidths: [3120, 3120, 3120],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Metric", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Month 1 Target", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Month 3 Target", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Website Visitors")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("500+")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("2,000+")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Email Subscribers")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("50+")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("200+")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Consultations Booked")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("5+")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("15-20")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Customers")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("2-3")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("10-15")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Monthly Revenue")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("$1,400-2,100")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("$5,000-10,000")] })] })
          ]})
        ]
      }),
      
      // Budget
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Budget (First 90 Days)")] }),
      new Table({
        columnWidths: [4680, 2340, 2340],
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Category", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Budget", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Notes", bold: true, color: "FFFFFF" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("GL.iNet Hardware Inventory")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("$500-800")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("2x Flint 2 + 3x Beryl AX")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Email Marketing")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("$0")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Free tier available")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Video Equipment")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("$0-100")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Use phone + free editing")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Reddit Ads (optional)")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("$0-300")] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun("Test after organic works")] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "E8F4FD", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "TOTAL", bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "E8F4FD", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "$500-1,200", bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "E8F4FD", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun("Lean validation")] })] })
          ]})
        ]
      }),

      // Immediate Action Items
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Immediate Action Items (This Week)")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Today")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun("Apply GL.iNet Affiliate: "),
        new ExternalHyperlink({ children: [new TextRun({ text: "gl-inet.com/affiliate-program/", style: "Hyperlink" })], link: "https://www.gl-inet.com/affiliate-program/" })
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun("Apply GL.iNet Reseller: "),
        new ExternalHyperlink({ children: [new TextRun({ text: "gl-inet.com/form/become-a-reseller/", style: "Hyperlink" })], link: "https://www.gl-inet.com/form/become-a-reseller/" })
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Create Reddit account (u/NomadVPNPro or similar)")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Tomorrow")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Post 5 helpful comments on r/digitalnomad")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Post 5 helpful comments on r/GlInet")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Draft first educational Reddit post")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("This Week")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Create lead magnet: \"Travel Router Comparison Guide 2025\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Set up email capture on website")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Script first YouTube video")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Post to r/GlInet (smaller, test audience)")] }),

      // Key Links
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Key Links & Resources")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun("Your Website: "),
        new ExternalHyperlink({ children: [new TextRun({ text: "localhost:3000 (deploy to production)", style: "Hyperlink" })], link: "http://localhost:3000" })
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun("GL.iNet Affiliate: "),
        new ExternalHyperlink({ children: [new TextRun({ text: "gl-inet.com/affiliate-program/", style: "Hyperlink" })], link: "https://www.gl-inet.com/affiliate-program/" })
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun("GL.iNet Reseller: "),
        new ExternalHyperlink({ children: [new TextRun({ text: "gl-inet.com/form/become-a-reseller/", style: "Hyperlink" })], link: "https://www.gl-inet.com/form/become-a-reseller/" })
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun("GL.iNet Forum: "),
        new ExternalHyperlink({ children: [new TextRun({ text: "forum.gl-inet.com", style: "Hyperlink" })], link: "https://forum.gl-inet.com" })
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun("r/digitalnomad: "),
        new ExternalHyperlink({ children: [new TextRun({ text: "reddit.com/r/digitalnomad", style: "Hyperlink" })], link: "https://www.reddit.com/r/digitalnomad" })
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun("r/GlInet: "),
        new ExternalHyperlink({ children: [new TextRun({ text: "reddit.com/r/GlInet", style: "Hyperlink" })], link: "https://www.reddit.com/r/GlInet" })
      ]}),
      
      // Contact
      new Paragraph({ spacing: { before: 480 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Contact: timudai@outlook.com | (213) 321-8300", color: "666666" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Generated: " + new Date().toLocaleDateString(), color: "999999", size: 18 })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("C:/Users/timud/nomadvpn-pro/NomadVPN_Marketing_Plan.docx", buffer);
  console.log("Word document created successfully!");
});
