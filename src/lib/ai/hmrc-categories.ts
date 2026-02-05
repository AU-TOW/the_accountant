/**
 * HMRC Expense Categories for Self-Assessment & Corporation Tax
 * Maps to HMRC SA103 / CT600 boxes
 */

export interface HMRCCategory {
  code: string;
  name: string;
  description: string;
  examples: string[];
  saBox?: string; // Self Assessment box reference
}

export const HMRC_CATEGORIES: HMRCCategory[] = [
  {
    code: "cost_of_goods",
    name: "Cost of goods bought for resale or goods used",
    description: "Direct costs of producing goods/services you sell",
    examples: ["Raw materials", "Stock for resale", "Subcontractor costs"],
    saBox: "SA103 Box 10",
  },
  {
    code: "car_van_travel",
    name: "Car, van and travel expenses",
    description: "Business travel costs including mileage, parking, public transport",
    examples: ["Fuel", "Mileage allowance", "Train tickets", "Parking", "Road tolls", "Congestion charge"],
    saBox: "SA103 Box 11",
  },
  {
    code: "wages_staff",
    name: "Wages, salaries and other staff costs",
    description: "Employee costs including salaries, NI, pensions, benefits",
    examples: ["Salaries", "Employer NI", "Pension contributions", "Staff training", "Recruitment"],
    saBox: "SA103 Box 12",
  },
  {
    code: "rent_rates_power",
    name: "Rent, rates, power and insurance costs",
    description: "Premises costs including rent, business rates, utilities, insurance",
    examples: ["Office rent", "Business rates", "Electricity", "Gas", "Water", "Business insurance"],
    saBox: "SA103 Box 13",
  },
  {
    code: "repairs_maintenance",
    name: "Repairs and maintenance of property and equipment",
    description: "Keeping your business premises and equipment in working order",
    examples: ["Building repairs", "Equipment servicing", "Decorating", "Replacement parts"],
    saBox: "SA103 Box 14",
  },
  {
    code: "phone_stationery",
    name: "Phone, fax, stationery and other office costs",
    description: "Communication and general office running costs",
    examples: ["Phone bills", "Internet", "Stamps", "Printer ink", "Software subscriptions"],
    saBox: "SA103 Box 15",
  },
  {
    code: "advertising",
    name: "Advertising and business entertainment costs",
    description: "Marketing and promotion costs (not client entertaining)",
    examples: ["Website costs", "Google Ads", "Business cards", "Flyers", "Trade shows"],
    saBox: "SA103 Box 16",
  },
  {
    code: "interest_finance",
    name: "Interest on bank and other loans",
    description: "Finance charges and bank fees",
    examples: ["Loan interest", "Overdraft fees", "Bank charges", "Credit card interest"],
    saBox: "SA103 Box 17",
  },
  {
    code: "professional_fees",
    name: "Accountancy, legal and other professional fees",
    description: "Professional services directly for the business",
    examples: ["Accountant fees", "Legal advice", "Consultancy", "Trade body subscriptions"],
    saBox: "SA103 Box 18",
  },
  {
    code: "depreciation",
    name: "Depreciation and loss/profit on sale of assets",
    description: "Capital allowances on equipment and assets",
    examples: ["Computer equipment", "Machinery", "Office furniture", "Vehicles"],
    saBox: "SA103 Box 19",
  },
  {
    code: "other_expenses",
    name: "Other allowable business expenses",
    description: "Any other wholly and exclusively for the business",
    examples: ["Protective clothing", "Tools", "Trade journals", "Working from home"],
    saBox: "SA103 Box 20",
  },
  {
    code: "use_of_home",
    name: "Use of home as office",
    description: "Proportion of home costs for business use",
    examples: ["Rent proportion", "Mortgage interest proportion", "Utilities", "Council tax proportion"],
    saBox: "SA103 Box 20 (included in other)",
  },
];

export const HMRC_CATEGORY_MAP = Object.fromEntries(
  HMRC_CATEGORIES.map((c) => [c.code, c])
);
