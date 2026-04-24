import { useState } from "react";


// ── ALL CARIBBEAN ISLANDS WEALTH DATA ────────────────────────────────────────
const wealthData = [
  {
    id: 1, island: "Turks & Caicos", flag: "🇹🇨", status: "full",
    health: { name: "National Health Insurance Plan (NHIP)", detail: "Mandatory for ALL residents & employees. Only $10 per doctor visit. Covers primary care, secondary care, immunizations & overseas treatment referrals. 3% employer / 3% employee split.", link: "nhib.tc" },
    retirement: { name: "TCI National Insurance Board (NIB)", detail: "Mandatory social insurance for ALL employed people ages 16–65. Covers retirement pension, disability, and dependent benefits. Established 1992.", link: "tcinib.tc" },
    insurance: [{ name: "NW Hamilton Insurance", detail: "Life, health, disability, pension, annuities, property. Lloyd's of London specialty lines.", contact: "+1 649-946-4431" }, { name: "TCI First Insurance", detail: "TCI's first indigenous insurer. Home, auto, health, marine & business. 25+ years.", contact: "+1 649-946-4431" }, { name: "GK Insurance Brokers", detail: "Agent for Guardian General Insurance. Commercial, liability, residential, auto, marine.", contact: "+1 649-946-4823" }],
    savings: [{ name: "Scotiabank TCI", detail: "High yield savings, fixed deposits, USD accounts.", rate: "Competitive" }, { name: "RBC Royal Bank TCI", detail: "Full banking services in TCI. Savings, chequing, term deposits.", rate: "Varies" }],
    creditUnions: [],
    funFact: "TCI uses the US Dollar as its official currency — no conversion needed for US-based Belongers! 🌴"
  },
  {
    id: 2, island: "Jamaica", flag: "🇯🇲", status: "full",
    health: { name: "National Health Fund (NHF) Card", detail: "FREE card subsidizing 24 chronic illnesses. Children under 19 get DOUBLE medication discounts. Seniors 60+ pay only $40 per drug item. Diabetics get free glucometer every 2 years.", link: "nhf.org.jm" },
    retirement: { name: "National Insurance Scheme (NIS)", detail: "Mandatory for ALL employed Jamaicans 18–70. Covers retirement pension, work injury, sickness & death benefits. Employer and employee each contribute 2.5% of gross salary.", link: "mlss.gov.jm" },
    insurance: [{ name: "Sagicor Jamaica", detail: "Life, health, home, auto, travel. Pension and investment services.", contact: "sagicor.com/en-jm" }, { name: "Guardian Life Jamaica", detail: "Life insurance, annuities, pension plans, children's education savings.", contact: "myguardiangroup.com" }],
    savings: [{ name: "JN Bank High Yield Account", detail: "Open with JA$5,000 or US$100. Available to Jamaicans in US, Canada & UK. Deposits insured up to J$1.2M.", rate: "Competitive" }, { name: "JMMB 'A' Account", detail: "Tax-free high yield for non-residents. USD, CAD, or GBP. No dormancy fees.", rate: "Tax-free" }],
    creditUnions: [{ name: "CWJ Credit Union", detail: "Long Term Savings Account — up to J$1M/year, tax benefits on interest earned.", rate: "6%+ above fixed deposit" }],
    funFact: "The NHF Card is completely FREE to apply for through your doctor — it can save thousands on medication every year! 💊"
  },
  {
    id: 3, island: "Trinidad & Tobago", flag: "🇹🇹", status: "full",
    health: { name: "NIS Health & Sickness Benefits", detail: "Mandatory contributions cover sickness benefits and maternity allowance. Public healthcare through government hospitals is free or low cost for residents.", link: "ttconnect.gov.tt" },
    retirement: { name: "National Insurance Scheme (NIS) TT", detail: "Covers old-age pension, disability, survivors, employment injury. Mandatory for all employed persons. Benefits include maternity leave pay.", link: "niherp.gov.tt" },
    insurance: [{ name: "Sagicor Trinidad", detail: "Since 1840. Life, health, car, home, travel, accident insurance, group benefits, mortgages, retirement & pension across 18 Caribbean countries.", contact: "sagicor.com/en-tt" }, { name: "Guardian Life of the Caribbean", detail: "Flexible pension plans & annuities. Group life insurance. Children's education savings plans.", contact: "myguardiangroup.com" }],
    savings: [{ name: "Scotiabank TT High Yield Savings", detail: "Earn more interest when you save more. Deposits insured by TT DIC up to $200,000 TTD.", rate: "Tiered rates" }, { name: "Republic Bank TT", detail: "Savings Plus, TimeSaver, Certificate of Deposit accounts.", rate: "0.05%–higher on CDs" }],
    creditUnions: [{ name: "59 Credit Unions across TT", detail: "572,000+ members, $1.4B+ in total savings. Fixed rates, no stamp duty on mortgages, annual dividends, free will preparation workshops.", rate: "Better than banks" }],
    funFact: "TT credit unions beat banks on almost everything — fixed loan rates, no stamp duty on mortgages, AND annual dividends just for being a member! 🏦"
  },
  {
    id: 4, island: "Barbados", flag: "🇧🇧", status: "full",
    health: { name: "NIS Sickness Benefits & Public Healthcare", detail: "Public healthcare largely free for Barbadian nationals. NIS covers sickness cash benefits. Queen Elizabeth Hospital provides secondary care.", link: "nis.gov.bb" },
    retirement: { name: "National Insurance Scheme (NIS) Barbados", detail: "Most developed NIS in the Caribbean — THREE separate funds: old-age pension, unemployment benefits AND severance pay. Retirement age going to 68 by 2034.", link: "nis.gov.bb" },
    insurance: [{ name: "Sagicor Barbados", detail: "Full suite: life, health, motor, home, travel, mutual funds, home ownership AND retirement. Established 1840.", contact: "sagicor.com/en-bb" }, { name: "Insurance Corporation of Barbados (ICBL)", detail: "Home, motor, health, travel, marine and commercial insurance.", contact: "icbl.com" }],
    savings: [{ name: "Republic Bank Barbados — Savings Plus", detail: "Interest calculated daily on balances of $5,000 BDS+. FREE Visa Debit card.", rate: "On balances $5,000+" }, { name: "RBC Royal Bank Barbados", detail: "Savings in BDS and USD. Insured deposits.", rate: "Varies" }],
    creditUnions: [{ name: "Barbados Public Workers Co-op Credit Union", detail: "Primary Shares interest paid twice yearly. Vacation Club, Christmas Club, and Homebuilders savings accounts.", rate: "Semi-annual interest" }],
    funFact: "Barbados has the MOST comprehensive National Insurance in the Caribbean — unemployment benefits AND severance pay on top of your pension! 💪"
  },
  {
    id: 5, island: "Saint Lucia", flag: "🇱🇨", status: "full",
    health: { name: "NIC Sickness Benefit & Public Healthcare", detail: "Cash sickness benefit for employed contributors. Public healthcare at Victoria Hospital and district health centres.", link: "nicsaintlucia.org" },
    retirement: { name: "National Insurance Corporation (NIC) Saint Lucia", detail: "Retirement pension, invalidity benefit, survivors benefit, employment injury benefit. Contributions mandatory for all employed persons.", link: "nicsaintlucia.org" },
    insurance: [{ name: "Sagicor Saint Lucia", detail: "Life, health, home, motor and travel insurance. Pension and investment products.", contact: "sagicor.com" }, { name: "Guardian General Insurance", detail: "Home, auto, commercial and marine insurance across Saint Lucia.", contact: "myguardiangroup.com" }],
    savings: [{ name: "Bank of Saint Lucia", detail: "Savings, fixed deposits, youth savings, USD accounts. XCD pegged to USD at 2.70:1.", rate: "Stable XCD currency" }],
    creditUnions: [{ name: "Saint Lucia Credit Union League", detail: "Multiple credit unions offering better savings rates, lower loan rates, and member dividends.", rate: "Better than banks" }],
    funFact: "Saint Lucia's Eastern Caribbean Dollar has been pegged to the US Dollar at the same fixed rate since 1976! Your money stays stable. 💵"
  },
  {
    id: 6, island: "Grenada", flag: "🇬🇩", status: "full",
    health: { name: "NIS Sickness Benefit & Public Healthcare", detail: "General Hospital and district health centres provide public healthcare. NIS sickness benefit for contributors.", link: "nisgrenada.org" },
    retirement: { name: "National Insurance Scheme (NIS) Grenada", detail: "Old-age pension, invalidity pension, survivors benefit, and employment injury. Mandatory for all employed.", link: "nisgrenada.org" },
    insurance: [{ name: "Sagicor Grenada", detail: "Life, health, home, motor insurance and pension plans.", contact: "sagicor.com" }],
    savings: [{ name: "Republic Bank Grenada", detail: "Savings Plus, CDs, USD accounts. Part of major Caribbean banking network.", rate: "Varies" }],
    creditUnions: [{ name: "Grenada Co-operative Credit Union League", detail: "Community credit unions offering competitive savings rates, low loan rates, and member dividends.", rate: "Better than banks" }],
    funFact: "Grenada's XCD has been pegged to the US Dollar at the same rate for nearly 50 years — one of the most stable currencies in the Caribbean. 🌴"
  },
  {
    id: 7, island: "The Bahamas", flag: "🇧🇸", status: "full",
    health: { name: "NHI Bahamas (National Health Insurance)", detail: "Over 160,000 Bahamians enrolled. NO copays or deductibles for covered primary care services. Covers doctor visits, lab tests, and telehealth. Available across Nassau, Grand Bahama, Abaco, Exuma, Long Island and more.", link: "nhibahamas.gov.bs" },
    retirement: { name: "National Insurance Board (NIB)", detail: "Established 1972. Provides 10 cash benefits including Sickness, Maternity, Funeral, Retirement, Invalidity, Survivorship, Unemployment, Injury, Disablement and Death.", link: "nib-bahamas.com" },
    insurance: [{ name: "Colina Insurance", detail: "Life, health, disability, and group insurance across the Bahamas.", contact: "colina.com" }, { name: "RoyalStar Assurance", detail: "Home, auto, marine, and commercial insurance for Bahamian residents.", contact: "royalstar.com" }, { name: "Island Heritage Insurance", detail: "Property and casualty insurance across the Bahamas and Caribbean.", contact: "islandheritage.com" }],
    savings: [{ name: "Commonwealth Bank Bahamas", detail: "Savings accounts, fixed deposits, mortgage products. Bahamas-focused bank.", rate: "Competitive" }, { name: "Scotiabank Bahamas", detail: "Full banking services. Savings, chequing, term deposits in BSD and USD.", rate: "Varies" }],
    creditUnions: [{ name: "Bahamas Co-operative Credit Union League", detail: "Member-owned financial institutions across New Providence and Grand Bahama.", rate: "Better than banks" }],
    funFact: "NHI Bahamas launched in 2017 and over 160,000 Bahamians now access FREE primary care — no copays, no deductibles! 🏥"
  },
  {
    id: 8, island: "Dominican Republic", flag: "🇩🇴", status: "full",
    health: { name: "SENASA — National Health Insurance", detail: "All Dominican citizens and legal residents have the right to affiliate. Covers health prevention, illness treatment and rehabilitation. ARS (Health Risk Administrators) manage private plans: ARS Humano, ARS Universal, ARS Banreservas, Mapfre Salud.", link: "senasa.gob.do" },
    retirement: { name: "AFP System (Pension Fund Administrators)", detail: "Dominican version of the 401k. Workers choose an AFP to manage their individual retirement account. Employer contributes a larger % than employee. Retirement at age 60 with 30 years of contributions. Pension funds are tax-exempt.", link: "sipen.gob.do" },
    insurance: [{ name: "ARS Humano", detail: "Most widely used health insurance in the DR. Strong network across the country.", contact: "arshumano.com.do" }, { name: "Mapfre Salud DR", detail: "Major insurance player. Covers 7 key illnesses, hospitalization, emergency care.", contact: "mapfre.com.do" }, { name: "Seguros Reservas", detail: "State-backed insurer. Wide range of life, health, and property insurance.", contact: "segurosreservas.com" }],
    savings: [{ name: "Banreservas", detail: "State-owned bank. Voted Best Bank in the Caribbean 2023 & 2024 by Global Finance Magazine. Savings, CDs, USD accounts.", rate: "Competitive" }, { name: "Banco Popular Dominicano", detail: "Largest private bank in DR. Savings, investments, USD accounts.", rate: "Varies" }],
    creditUnions: [{ name: "AIRAC Credit Union Network", detail: "Multiple cooperative credit unions across the Dominican Republic offering savings and loan products.", rate: "Better than banks" }],
    funFact: "The Dominican Republic's AFP system is like a 401k — your retirement savings grow in your own personal account and are completely tax-free! 📈"
  },
  {
    id: 9, island: "Guyana", flag: "🇬🇾", status: "full",
    health: { name: "NIS Health Benefits & Public Hospitals", detail: "Georgetown Public Hospital and regional hospitals provide public healthcare. NIS covers sickness cash benefits for contributors. Private health insurance widely available.", link: "nisgov.gy" },
    retirement: { name: "National Insurance Scheme (NIS) Guyana", detail: "Covers old-age pension, invalidity, survivors, sickness, maternity, funeral grants and employment injury. Mandatory for all employed persons.", link: "nisgov.gy" },
    insurance: [{ name: "Guyana and Trinidad Mutual Life (GTM)", detail: "Life insurance, health insurance, pension plans across Guyana.", contact: "gtmlife.com" }, { name: "Hand-in-Hand Mutual Fire & Life Insurance", detail: "One of Guyana's oldest insurers. Life, fire, motor, marine insurance.", contact: "handinhandinsurance.com" }],
    savings: [{ name: "Republic Bank Guyana", detail: "Savings accounts, term deposits, USD accounts. Part of Caribbean banking network.", rate: "Varies" }, { name: "Demerara Bank", detail: "Local Guyanese bank offering personal and business savings accounts.", rate: "Competitive" }],
    creditUnions: [{ name: "Guyana Co-operative Credit Union League", detail: "Network of credit unions across Guyana offering competitive savings and loan products.", rate: "Better than banks" }],
    funFact: "Guyana is one of the fastest-growing economies in the world right now thanks to oil discovery — new financial opportunities are opening up for Guyanese every year! 🛢️"
  },
  {
    id: 10, island: "Haiti", flag: "🇭🇹", status: "full",
    health: { name: "ONA — Office National d'Assurance Vieillesse", detail: "National social security system covering retirement, disability and survivor benefits. Public hospitals provide basic care. MSF and international NGOs provide significant healthcare support.", link: "ona.ht" },
    retirement: { name: "ONA Retirement System", detail: "Mandatory contributions for employed workers. Covers old-age pension, invalidity, and survivor benefits. Coverage being expanded through ongoing reforms.", link: "ona.ht" },
    insurance: [{ name: "Unibank Insurance Haiti", detail: "Life, health, auto, property insurance through Haiti's largest private bank group.", contact: "unibankhaiti.com" }, { name: "SOGEBANK Insurance", detail: "Auto, home, health, travel and commercial insurance.", contact: "sogebank.com" }],
    savings: [{ name: "Unibank Haiti", detail: "Savings accounts, fixed deposits, USD accounts. Haiti's leading private bank.", rate: "HTG & USD rates" }, { name: "BNC — Banque Nationale de Crédit", detail: "State bank. Savings, remittance services, USD accounts.", rate: "Varies" }],
    creditUnions: [{ name: "KNFP (Network of Haitian Credit Unions)", detail: "Growing network of cooperative financial institutions providing savings and credit to Haitian communities.", rate: "Community rates" }],
    funFact: "Haiti has significant diaspora remittances — over $3 billion sent home annually. Islandpact Pay can make this faster and cheaper for Haitian families! 🌴"
  },
  {
    id: 11, island: "Antigua & Barbuda", flag: "🇦🇬", status: "full",
    health: { name: "NIS Sickness Benefits & Public Healthcare", detail: "Mount St. John's Medical Centre provides public hospital care. NIS sickness cash benefit for contributors.", link: "nisantiguabarbuda.com" },
    retirement: { name: "National Insurance Scheme (NIS) Antigua", detail: "Old-age pension, invalidity benefit, survivors, funeral grant and employment injury. Mandatory for all employed. XCD-based benefits.", link: "nisantiguabarbuda.com" },
    insurance: [{ name: "Sagicor Antigua", detail: "Life, health, home, motor insurance and pension plans.", contact: "sagicor.com" }, { name: "Algico Insurance Antigua", detail: "Home, auto, health and commercial insurance across Antigua.", contact: "algico.com" }],
    savings: [{ name: "CIBC Caribbean Antigua", detail: "Savings, chequing, term deposits. XCD pegged to USD at 2.70:1.", rate: "Stable XCD" }, { name: "Eastern Caribbean Amalgamated Bank", detail: "Local Antiguan bank with savings and business accounts.", rate: "Competitive" }],
    creditUnions: [{ name: "Antigua & Barbuda Workers Union Credit Union", detail: "Member savings, loans, and financial services for Antiguans.", rate: "Member dividends" }],
    funFact: "Antigua & Barbuda has NO income tax and NO capital gains tax — making it one of the most tax-friendly places to build wealth in the Caribbean! 💰"
  },
  {
    id: 12, island: "St. Kitts & Nevis", flag: "🇰🇳", status: "full",
    health: { name: "NIS Sickness Benefits & Public Healthcare", detail: "Joseph N. France General Hospital provides public care. NIS sickness cash benefits for contributors.", link: "nisskn.kn" },
    retirement: { name: "Social Security SKN", detail: "Old-age pension, invalidity, survivors, funeral grant and employment injury benefits for all employed persons.", link: "socialsecurity.kn" },
    insurance: [{ name: "Sagicor SKN", detail: "Life, health, home, motor insurance.", contact: "sagicor.com" }, { name: "Guardian General Insurance SKN", detail: "Property, auto, marine and commercial insurance.", contact: "myguardiangroup.com" }],
    savings: [{ name: "St. Kitts-Nevis-Anguilla National Bank", detail: "Local national bank. Savings, term deposits, mortgage products in XCD.", rate: "Competitive" }],
    creditUnions: [{ name: "SKN Co-operative Credit Union", detail: "Member savings, loans and financial services.", rate: "Member dividends" }],
    funFact: "St. Kitts & Nevis runs one of the world's oldest Citizenship by Investment programs — some of the most powerful passports come from this tiny twin-island nation! 🛂"
  },
  {
    id: 13, island: "St. Vincent & the Grenadines", flag: "🇻🇨", status: "full",
    health: { name: "NIS Sickness Benefits & Public Healthcare", detail: "Milton Cato Memorial Hospital provides public care. NIS sickness cash benefits for contributors. XCD-based system.", link: "nisvg.org" },
    retirement: { name: "National Insurance Services (NIS) SVG", detail: "Age benefit, invalidity, survivors, funeral grant and employment injury. Mandatory contributions for all employed.", link: "nisvg.org" },
    insurance: [{ name: "Sagicor SVG", detail: "Life, health, home, motor insurance and pension plans.", contact: "sagicor.com" }],
    savings: [{ name: "Bank of SVG", detail: "National savings accounts, term deposits in XCD and USD.", rate: "Stable XCD" }],
    creditUnions: [{ name: "SVG Teachers Co-operative Credit Union", detail: "One of the largest credit unions in SVG. Savings, loans, member dividends.", rate: "Member dividends" }],
    funFact: "SVG's XCD is pegged to the US Dollar at the same fixed rate since 1976 — your savings hold their value! 💵"
  },
  {
    id: 14, island: "Dominica", flag: "🇩🇲", status: "full",
    health: { name: "NIS Sickness Benefits & Public Healthcare", detail: "Princess Margaret Hospital provides public care. NIS sickness cash benefits. XCD-based system.", link: "nisdominica.dm" },
    retirement: { name: "National Insurance Scheme (NIS) Dominica", detail: "Old-age pension, invalidity, survivors, funeral grant and employment injury. Mandatory for all employed.", link: "nisdominica.dm" },
    insurance: [{ name: "Sagicor Dominica", detail: "Life, health, home, motor insurance and pension plans.", contact: "sagicor.com" }],
    savings: [{ name: "National Bank of Dominica", detail: "Local national bank. Savings, term deposits, USD accounts.", rate: "Competitive" }],
    creditUnions: [{ name: "Dominica Co-operative Credit Union League", detail: "Network of credit unions with member savings, loans and dividends.", rate: "Member dividends" }],
    funFact: "Dominica is known as the 'Nature Isle of the Caribbean' and is building the world's first climate-resilient country — invest here and be part of history! 🌿"
  },
  {
    id: 15, island: "Cayman Islands", flag: "🇰🇾", status: "full",
    health: { name: "Health Insurance (SHIC) — Mandatory", detail: "Standard Health Insurance Contract (SHIC) mandatory for all employees. Employers must provide basic health coverage. Cayman Islands Hospital (Health City) provides world-class care.", link: "cihsa.ky" },
    retirement: { name: "National Pensions Law — Mandatory", detail: "ALL employers must provide a pension plan for employees. Employer contributes 5%, employee contributes 5% — total 10% of salary. 100% employer-matched contributions.", link: "dci.gov.ky" },
    insurance: [{ name: "Cayman Islands Insurance Companies", detail: "Cayman is a major offshore financial center. International life, health, property and captive insurance available.", contact: "cima.ky" }, { name: "Sagicor Cayman", detail: "Life, health and pension products.", contact: "sagicor.com" }],
    savings: [{ name: "Cayman National Bank", detail: "Full banking in KYD and USD. High yield savings and term deposits.", rate: "Competitive USD rates" }, { name: "Butterfield Bank Cayman", detail: "International banking, wealth management and savings products.", rate: "Premium rates" }],
    creditUnions: [{ name: "Cayman Islands Civil Service Co-op", detail: "Credit union for civil servants and community members.", rate: "Member dividends" }],
    funFact: "Cayman Islands has NO income tax, NO capital gains tax, and NO corporation tax — it's one of the world's leading offshore financial centers! 💎"
  },
  {
    id: 16, island: "Aruba", flag: "🇦🇼", status: "coming",
    health: { name: "AZV — General Health Insurance", detail: "Algemene Ziektekosten Verzekering (AZV) — mandatory universal health insurance for all Aruba residents. Government-run. Covers most medical services.", link: "azv.aw" },
    retirement: { name: "SVB — Social Insurance Bank", detail: "Old-age pension (AOV), survivors benefit, child benefit. Mandatory contributions for all employed residents.", link: "svb.aw" },
    insurance: [{ name: "ENNIA Insurance Aruba", detail: "Life, health, auto, property insurance for Aruban residents.", contact: "ennia.com" }],
    savings: [{ name: "Aruba Bank", detail: "Local bank. Savings, term deposits, USD and AWG accounts.", rate: "Varies" }],
    creditUnions: [],
    funFact: "Aruba has a separate currency (Aruban Florin) pegged to the US Dollar, and universal health insurance for ALL residents — one of the most progressive systems in the Caribbean! 🏥"
  },
  {
    id: 17, island: "Curaçao", flag: "🇨🇼", status: "coming",
    health: { name: "SVB — Social Insurance Bank Health Benefits", detail: "Mandatory health insurance contributions through SVB for employed residents. BZV health insurance for low-income residents.", link: "svbcuracao.com" },
    retirement: { name: "SVB — AOV Old Age Pension", detail: "Mandatory pension contributions for all employed residents. Old-age pension, survivors benefit and disability benefits.", link: "svbcuracao.com" },
    insurance: [{ name: "ENNIA Insurance Curaçao", detail: "Life, health, auto and property insurance.", contact: "ennia.com" }],
    savings: [{ name: "Maduro & Curiel's Bank", detail: "Oldest bank in Curaçao. Savings, term deposits, USD and ANG accounts.", rate: "Competitive" }],
    creditUnions: [],
    funFact: "Curaçao is a major offshore financial center — it has one of the most developed banking systems in the Dutch Caribbean! 🏦"
  },
  {
    id: 18, island: "Puerto Rico", flag: "🇵🇷", status: "coming",
    health: { name: "Mi Salud — Medicaid Puerto Rico", detail: "Puerto Ricans qualify for US Medicaid (Mi Salud). US Medicare also available for eligible residents. Federal health programs apply.", link: "health.pr.gov" },
    retirement: { name: "Social Security & US 401k Plans", detail: "Puerto Ricans qualify for US Social Security contributions and benefits. US-style 401k retirement plans available through employers. Full US retirement system access.", link: "ssa.gov" },
    insurance: [{ name: "Triple S Insurance", detail: "Puerto Rico's largest health insurer. Life, health, dental, vision plans.", contact: "triplespr.com" }, { name: "Universal Insurance PR", detail: "Auto, home, health and commercial insurance.", contact: "universal.pr" }],
    savings: [{ name: "FirstBankPR", detail: "Full US banking. FDIC insured. Savings, CDs, USD accounts at US rates.", rate: "US rates" }, { name: "Popular Inc. (Banco Popular)", detail: "Puerto Rico's largest bank. Full US banking services.", rate: "Competitive US rates" }],
    creditUnions: [{ name: "COSSEC — Credit Unions PR", detail: "Government-supervised credit unions across Puerto Rico offering competitive rates.", rate: "Better than banks" }],
    funFact: "Puerto Ricans have access to the FULL US financial system — Social Security, 401k, FDIC insurance, Medicare — AND live in the Caribbean! 🇺🇸🌴"
  },
  {
    id: 19, island: "US Virgin Islands", flag: "🇻🇮", status: "coming",
    health: { name: "Medicaid USVI & US Medicare", detail: "US Medicaid and Medicare programs apply to USVI residents. Federal healthcare programs accessible.", link: "health.vi.gov" },
    retirement: { name: "Social Security & US Retirement Plans", detail: "Full US Social Security system. US-style 401k plans through employers. Federal retirement benefits.", link: "ssa.gov" },
    insurance: [{ name: "US Insurance Companies", detail: "All major US insurance companies operate in USVI. Life, health, auto, home — full US market access.", contact: "doi.vi.gov" }],
    savings: [{ name: "Banco Popular USVI", detail: "Full US banking. FDIC insured. US interest rates on savings.", rate: "US rates" }],
    creditUnions: [{ name: "USVI Credit Unions", detail: "NCUA-insured credit unions with US rates and protections.", rate: "US credit union rates" }],
    funFact: "USVI residents have access to the full US financial system — FDIC banking, US Social Security, and US interest rates — while living in paradise! 🌴"
  },
  {
    id: 20, island: "British Virgin Islands", flag: "🇻🇬", status: "coming",
    health: { name: "National Health Insurance (NHI) BVI", detail: "Government-run national health insurance. Mandatory for residents. Peebles Hospital provides public care.", link: "bvi.gov.vg" },
    retirement: { name: "Social Security BVI", detail: "Mandatory social security contributions. Old-age pension, invalidity, survivors and employment injury benefits.", link: "socialsecurity.vg" },
    insurance: [{ name: "BVI Insurance Companies", detail: "Caribbean-based insurers operate in BVI. Life, health, auto and property coverage.", contact: "bvi.gov.vg" }],
    savings: [{ name: "First Bank BVI", detail: "Full banking in USD. Savings, term deposits, mortgage products.", rate: "USD rates" }],
    creditUnions: [],
    funFact: "BVI uses the US Dollar and is a major offshore financial center — over 40% of the world's offshore companies are registered here! 💼"
  },
  {
    id: 21, island: "Sint Maarten", flag: "🇸🇽", status: "coming",
    health: { name: "SZV — Social & Health Insurances", detail: "Mandatory health insurance (ZV/OV) for all employed residents. Government-managed. Covers hospitalization, specialist care, medication.", link: "szv.sx" },
    retirement: { name: "SZV — AOV Old Age Pension", detail: "Mandatory old-age pension contributions for all employed residents. Survivor and disability benefits included.", link: "szv.sx" },
    insurance: [{ name: "ENNIA Sint Maarten", detail: "Life, health, auto and property insurance.", contact: "ennia.com" }],
    savings: [{ name: "Windward Islands Bank", detail: "Local bank serving Sint Maarten. Savings and USD accounts.", rate: "Competitive" }],
    creditUnions: [],
    funFact: "Sint Maarten is the only island in the world shared by two different countries (Netherlands & France) — two economies, two currencies, one paradise! 🌴"
  },
  {
    id: 22, island: "Anguilla", flag: "🇦🇮", status: "coming",
    health: { name: "NIS Sickness Benefits & Public Healthcare", detail: "Princess Alexandra Hospital provides public care. NIS sickness cash benefit for contributors. XCD-based system.", link: "socialdev.gov.ai" },
    retirement: { name: "National Insurance Fund (NIF) Anguilla", detail: "Old-age pension, invalidity, survivors and employment injury. Mandatory for all employed.", link: "socialdev.gov.ai" },
    insurance: [{ name: "Caribbean-wide Insurers", detail: "Guardian General, Sagicor and other regional insurers operate in Anguilla.", contact: "gov.ai" }],
    savings: [{ name: "Caribbean Commercial Bank Anguilla", detail: "Local bank. Savings, term deposits, XCD and USD accounts.", rate: "Stable XCD" }],
    creditUnions: [],
    funFact: "Anguilla has NO income tax and is one of the most exclusive destinations in the Caribbean — it punches way above its weight financially! 💎"
  },
  {
    id: 23, island: "Montserrat", flag: "🇲🇸", status: "coming",
    health: { name: "NIS Sickness Benefits & Public Healthcare", detail: "Glendon Hospital provides public care. NIS sickness cash benefits for contributors.", link: "nis.ms" },
    retirement: { name: "National Insurance Scheme (NIS) Montserrat", detail: "Old-age pension, invalidity, survivors, funeral grant and employment injury benefits.", link: "nis.ms" },
    insurance: [{ name: "Regional Caribbean Insurers", detail: "Sagicor and Guardian operate in Montserrat through regional networks.", contact: "gov.ms" }],
    savings: [{ name: "Bank of Montserrat", detail: "Local national bank. Savings, term deposits in XCD and USD.", rate: "Stable XCD" }],
    creditUnions: [],
    funFact: "Montserrat is the only Caribbean island with an active volcano — but it's also one of the friendliest communities in the region! 🌋"
  },
];

const financeTopics = [
  { id: "health", emoji: "🏥", label: "Health Insurance", color: "#c084fc" },
  { id: "retirement", emoji: "🏦", label: "Retirement", color: "#60a5fa" },
  { id: "insurance", emoji: "💀", label: "Life Insurance", color: "#f87171" },
  { id: "savings", emoji: "💰", label: "Savings", color: "#4ade80" },
  { id: "creditUnions", emoji: "🤝", label: "Credit Unions", color: "#fb923c" },
];

const financeLessons = [
  { title: "What is the NIS? (Caribbean 401k)", emoji: "🏦", content: "Every island has a National Insurance Scheme (NIS) — the Caribbean equivalent of Social Security and a 401k combined. A small % of your salary goes in every month and you receive a pension when you retire, plus benefits if sick or injured. Most people pay into it without understanding what they're entitled to. Always verify your NIS contributions are being made by your employer!" },
  { title: "Life Insurance — Why You Need It NOW", emoji: "💀", content: "Life insurance pays your family if something happens to you. In the Caribbean, many people leave nothing behind — no savings, no insurance. A basic life insurance policy can cost as little as $30–$50 USD per month through Sagicor or Guardian Life — companies that operate across almost every Caribbean island. This is how generational wealth starts — protecting what you have." },
  { title: "Credit Unions vs Banks — Who Wins?", emoji: "🤝", content: "In the Caribbean, credit unions almost always beat banks. They offer fixed interest rates on loans (banks can raise yours), no stamp duty on mortgages, annual dividends just for being a member, better savings rates, and free financial literacy workshops. If your island has a credit union, join it today." },
  { title: "High Yield Savings — Make Your Money Work", emoji: "💰", content: "A regular savings account might earn 0.05% interest. A high yield account or fixed deposit can earn significantly more. JMMB Jamaica, JN Bank, Scotiabank across the region — all offer better rates for committed savers. Don't leave money sitting in a basic account. Move it somewhere that pays you to save." },
  { title: "Building Credit in the Caribbean", emoji: "💳", content: "The Caribbean doesn't have the same credit system as America, but credit still matters for mortgages and loans. Get a credit card and pay it off monthly. This builds your credit history. In TCI, Jamaica, Barbados and TT, banks DO check credit history for loans. Start small — one credit card, always paid in full." },
  { title: "Wills & Estate Planning", emoji: "📝", content: "Most Caribbean people have no will. This means when they die, the government decides who gets what through 'intestacy' laws — destroying generational wealth. A simple will costs a few hundred dollars with a local lawyer. It protects your children, your property, and everything you worked for. This is the foundation of generational wealth." },
  { title: "Children's Savings Accounts", emoji: "👶", content: "Starting a savings account for your child at birth is one of the most powerful financial moves you can make. By age 18, even small regular deposits compound into significant money for education or a first home. Guardian Life education savings plans, credit union Christmas Clubs, and youth bank accounts across the Caribbean make this accessible for everyone." },
  { title: "Home Insurance — Non-Negotiable", emoji: "🏠", content: "Hurricane season runs June to November every year. In the Caribbean, home insurance is survival. Without it, one storm can wipe out everything you've built. Companies like TCI First Insurance, Sagicor, and Guardian operate across all islands. Always insure your home for replacement value, not just purchase price." },
];

const resources = [
  // ── TURKS & CAICOS ──
  { id: 1, name: "TCI National Housing Policy — Home Improvement Grant", category: "Housing", islands: ["Turks & Caicos"], description: "Government grant for home repairs and improvements for existing TCI homeowners. Part of the National Housing Policy with 3 programs covering housing concessions, home improvement, and new homeowner assistance.", eligibility: "TCI Islander or BOTC status. Must own the property. Apply at Department of Housing & Community Renewal.", contact: "housing.gov.tc | Laporte's Complex, Downtown Providenciales", emoji: "🏠" },
  { id: 2, name: "TCI Homeowner Stamp Duty Exemption", category: "Housing", islands: ["Turks & Caicos"], description: "TCIslanders get a $20,000 reduction in stamp duty OR a $20,000 import duty waiver on building materials, furniture and fixtures when buying or building a home. Most people don't know about this!", eligibility: "TCI Islander status required. First-time homebuyers and existing homeowners of 10+ years eligible.", contact: "Ministry of Finance, Grand Turk or Providenciales | gov.tc", emoji: "🏡" },
  { id: 3, name: "TCI National Scholarship Program", category: "Education", islands: ["Turks & Caicos"], description: "Full scholarships up to $40,000 USD for top TCI Islander students studying locally or abroad. Includes TCI Hope Award for vulnerable families, distance learning grants up to $15,000, and special needs education support.", eligibility: "TCI Islander status required. Based on academic merit and financial need. Hope Award for families earning under $35,000/year.", contact: "tcig-nefa.grantplatform.com | gov.tc/scholarshipsecretariat", emoji: "🎓" },
  { id: 4, name: "TCI National Health Insurance Plan (NHIP)", category: "Healthcare", islands: ["Turks & Caicos"], description: "Mandatory government health insurance for ALL TCI residents and employed persons. Only $10 per doctor visit. Covers primary care, secondary care, immunizations AND overseas treatment referrals for specialist care.", eligibility: "All residents and employed persons in TCI. Mandatory enrollment. 3% from employer, 3% from employee.", contact: "nhib.tc | National Health Insurance Board", emoji: "🏥" },
  { id: 5, name: "TCI Department of Social Development & Welfare", category: "Emergency Aid", islands: ["Turks & Caicos"], description: "Welfare grants, mental health counseling, child protection services, domestic violence support, and senior citizen programs across TCI. Mental health services available to all residents.", eligibility: "TCI residents in need. No income requirement for mental health services. Child protection open to all.", contact: "gov.tc/dsd | Grand Turk: +1-649-242-0436 | Provo: +1-649-243-0435", emoji: "🤝" },
  { id: 6, name: "TCI Cost of Living Relief Grant", category: "Grants", islands: ["Turks & Caicos"], description: "One-time $1,000 USD cash grant for every TCIslander and British Overseas Territory Citizen (BOTC) announced as part of the $15 million government relief package to combat inflation.", eligibility: "TCIslander or BOTC status required. Apply through TCI Government offices.", contact: "gov.tc | Premier's Office, Providenciales", emoji: "💰" },
  { id: 7, name: "TCI National Insurance Board (NIB)", category: "Grants", islands: ["Turks & Caicos"], description: "Social insurance for ALL employed people in TCI ages 16–65. Covers retirement pension, disability benefits, survivors benefits, and employment injury. Most employed people pay in without knowing what they're entitled to.", eligibility: "All employed persons in TCI ages 16–65. Mandatory contributions from employer and employee.", contact: "tcinib.tc | NIB offices across TCI", emoji: "🏦" },

  // ── JAMAICA ──
  { id: 8, name: "PATH — Programme of Advancement Through Health & Education", category: "Grants", islands: ["Jamaica"], description: "Jamaica's food stamp equivalent — cash grants to over 350,000 vulnerable Jamaican families. Covers food, healthcare, and education needs. Payments every 2 months. Budget increased 54% to $740 million for 2025/2026.", eligibility: "Low-income Jamaican households. Elderly, disabled, single parents, and children prioritized. Apply at nearest MLSS Parish Office.", contact: "mlss.gov.jm | 1-888-MLSS-JAM | Parish offices island-wide", emoji: "🍽️" },
  { id: 9, name: "NHT — National Housing Trust Jamaica", category: "Housing", islands: ["Jamaica"], description: "Every employed Jamaican contributes to NHT and can access low-interest mortgages to buy or build a home. Home Grant of up to $3.5 million for low-income earners. Smart Energy Grant of $1.5 million for pensioners. Most Jamaicans don't claim what they're entitled to!", eligibility: "All NHT contributors ages 18–65. At least 52 weekly contributions required. First-time homebuyers prioritized.", contact: "nht.gov.jm | 1-888-225-5648 (Jamaica) | 1-800-858-3219 (US/Canada)", emoji: "🏠" },
  { id: 10, name: "NHF Card — National Health Fund Jamaica", category: "Healthcare", islands: ["Jamaica"], description: "FREE health card subsidizing medication for 24 chronic illnesses. Children under 19 get DOUBLE medication discounts. Seniors 60+ pay only $40 per drug item. Diabetics get free glucometer every 2 years. Completely FREE to apply!", eligibility: "All Jamaica residents. No income requirement. Apply through your doctor with your TRN number.", contact: "nhf.org.jm | NHF offices island-wide", emoji: "💊" },
  { id: 11, name: "HEART/NSTA Trust — Free Skills Training", category: "Education", islands: ["Jamaica"], description: "FREE vocational training and certification up to Associate Degree level for all Jamaicans. Programs include cybersecurity, construction, automotive repair, agriculture, nursing, and more. Free CSEC classes also available for adults through HSDE program.", eligibility: "All Jamaicans. Ages 17+ for most programs. No CSEC required for some programs. Apply at nearest HEART parish office.", contact: "heart-nsta.org | freeopenonlinetraining.heart-nsta.org (free online courses)", emoji: "🎓" },
  { id: 12, name: "PATH Tertiary Bursaries — Free University Funding", category: "Education", islands: ["Jamaica"], description: "Students from PATH households can access bursaries for university and post-secondary education. Post-Secondary Grants from $15,000–$30,000. Tertiary Bursaries for Bachelor's degrees. Over 4,000 PATH beneficiaries enrolled in tertiary institutions annually.", eligibility: "Must be from a PATH household. Enrolled in accredited Jamaican tertiary institution. Must have received PATH benefit while in secondary school.", contact: "mlss.gov.jm | PATH Parish Office | 1-876-922-8000", emoji: "📚" },
  { id: 13, name: "Jamaica NIS — National Insurance Scheme", category: "Grants", islands: ["Jamaica"], description: "Mandatory social insurance for ALL employed Jamaicans ages 18–70. Covers retirement pension, work injury, sickness, maternity and death benefits. Employer and employee each contribute 2.5% of gross salary. Check your contributions are being made!", eligibility: "All employed and self-employed Jamaicans ages 18–70. Mandatory enrollment. Register at any NIS parish office.", contact: "mlss.gov.jm/departments/national-insurance-scheme | Parish offices island-wide", emoji: "🏦" },
  { id: 14, name: "JBDC — Jamaica Business Development Corporation", category: "Business", islands: ["Jamaica"], description: "Government agency providing FREE business advice, training, mentoring and support for small and medium businesses. Helps with business planning, market access, quality certification and financing guidance.", eligibility: "Jamaican entrepreneurs and small business owners at any stage. No income requirement.", contact: "jbdc.net | 14 Camp Road, Kingston | 1-876-928-5161", emoji: "💼" },

  // ── TRINIDAD & TOBAGO ──
  { id: 15, name: "TT Food Support Programme — Food Card", category: "Grants", islands: ["Trinidad and Tobago"], description: "Trinidad's food stamp equivalent — monthly food card for low-income families facing financial hardship. Provides temporary food assistance to the most vulnerable. Completely free to access and process.", eligibility: "TT citizens/legal residents with low or no income. Elderly, disabled, single parents and families in crisis prioritized.", contact: "social.gov.tt | ttconnect.gov.tt | Hotline: 800-TTCN (8826)", emoji: "🍽️" },
  { id: 16, name: "TT Senior Citizens Pension", category: "Grants", islands: ["Trinidad and Tobago"], description: "Monthly pension of TT$5,500 for citizens 65+ to maintain a dignified quality of life. No charge to access or process. One of the most important benefits most seniors don't claim on time.", eligibility: "TT citizens 65 years and older. Income and residence criteria apply. Apply at nearest Social Welfare Office.", contact: "social.gov.tt | ttconnect.gov.tt | Nearest Social Welfare Office", emoji: "👴🏾" },
  { id: 17, name: "TT NSDP — Home Repair & Improvement Grants", category: "Housing", islands: ["Trinidad and Tobago"], description: "Government grants for minor house repairs (up to $15,000), sanitary plumbing improvements (up to $15,000), and electrical wiring/rewiring. Targets poor and vulnerable groups including seniors, disabled persons, unemployed and single parents.", eligibility: "TT citizens who own or have authorization to occupy the property. Low-income households. Means test required.", contact: "social.gov.tt/national-social-development-programme-nsdp-2 | Ministry of Social Development offices", emoji: "🔨" },
  { id: 18, name: "TT Public Assistance Grant", category: "Emergency Aid", islands: ["Trinidad and Tobago"], description: "Monthly financial aid for adults unable to work due to illness, disability or caregiving duties. Also covers children whose parents are deceased, ill, or imprisoned. Completely free — no charge to apply.", eligibility: "TT citizens/legal residents. Adults unable to work certified by government medical officer. Needy children whose parents cannot provide.", contact: "social.gov.tt | ttconnect.gov.tt | Nearest Social Welfare Office", emoji: "🤝" },
  { id: 19, name: "TT Disability Assistance Grant", category: "Grants", islands: ["Trinidad and Tobago"], description: "Financial support for individuals certified as permanently disabled and unable to work. Also special grant for children with disabilities of up to $1,500 per month. No charge to access.", eligibility: "TT nationals 18+ with permanent disability certified by government doctor. Children with severe disability also covered.", contact: "social.gov.tt | ttconnect.gov.tt | Nearest Social Welfare Office", emoji: "♿" },

  // ── BARBADOS ──
  { id: 20, name: "Barbados NIS — Unemployment & Severance Benefits", category: "Grants", islands: ["Barbados"], description: "Barbados has the most comprehensive NIS in the Caribbean with THREE separate funds — old age pension, unemployment benefits AND severance pay. If you lose your job in Barbados, you are entitled to unemployment benefits. Most people don't know they can claim!", eligibility: "All employed Barbadians who have made NIS contributions. Unemployment benefit available immediately upon job loss.", contact: "nis.gov.bb | NIS offices across Barbados", emoji: "🏦" },
  { id: 21, name: "Barbados Welfare Department — Social Assistance", category: "Grants", islands: ["Barbados"], description: "Monthly social assistance grants for low-income Barbadians including elderly, disabled, unemployed and vulnerable families. Food vouchers, housing assistance, and emergency grants available.", eligibility: "Barbadian citizens with low or no income. Elderly, disabled and vulnerable households prioritized.", contact: "welfare.gov.bb | Welfare Department offices | Ministry of People Empowerment", emoji: "🤝" },

  // ── BAHAMAS ──
  { id: 22, name: "NHI Bahamas — Free Primary Care", category: "Healthcare", islands: ["Bahamas"], description: "Over 160,000 Bahamians enrolled. NO copays or deductibles for covered primary care services. Covers doctor visits, lab tests, telehealth, and preventive care. Available across Nassau, Grand Bahama, Abaco, Exuma, Long Island and more.", eligibility: "All Bahamian residents. Completely free to enroll.", contact: "nhibahamas.gov.bs | National Health Insurance Authority", emoji: "🏥" },
  { id: 23, name: "Bahamas NIB — National Insurance Benefits", category: "Grants", islands: ["Bahamas"], description: "National Insurance Board provides 10 cash benefits including Sickness, Maternity, Funeral, Retirement, Invalidity, Survivorship, Unemployment, Injury, Disablement and Death benefits. Established 1972. Most Bahamians don't claim everything they're entitled to.", eligibility: "All employed Bahamians who contribute to NIB. Multiple benefit categories available.", contact: "nib-bahamas.com | NIB offices Nassau and Freeport", emoji: "🏦" },

  // ── DOMINICAN REPUBLIC ──
  { id: 24, name: "Dominican Republic AFP — Individual Pension Account", category: "Grants", islands: ["Dominican Republic"], description: "Dominican version of the 401k — your retirement savings grow in your own individual account managed by a Pension Fund Administrator (AFP). Completely tax-exempt. You can choose your AFP. Retirement at age 60 with 30 years contributions.", eligibility: "All employed Dominican citizens and legal residents. Mandatory enrollment. Self-employed can join the Subsidized Contribution Scheme.", contact: "sipen.gob.do | 809-688-0018", emoji: "📈" },
  { id: 25, name: "Dominican Republic SENASA — Health Insurance", category: "Healthcare", islands: ["Dominican Republic"], description: "All Dominican citizens and legal residents have the right to health insurance through SENASA. Health Risk Administrators (ARS) manage plans. No AFP or ARS may reject you based on age, gender, health or work status.", eligibility: "All Dominican citizens and legal residents. No rejection based on health status. Multiple ARS options available.", contact: "senasa.gob.do | ARS Humano | ARS Universal | ARS Banreservas", emoji: "🏥" },

  // ── INVEST TCI ──
  { id: 28, name: "Invest TCI — Free Business Support & Grants", category: "Business", islands: ["Turks & Caicos"], description: "FREE government agency helping TCIslanders start and grow businesses. Cash grants up to $10,000, customs waivers up to $25,000, technical assistance, business plans, marketing support. Most TCIslanders have NO IDEA this exists!", eligibility: "Must be majority-owned by a TCI Islander. Priority sectors: agriculture, fisheries, manufacturing, tourism. Free to access.", contact: "investturksandcaicos.tc | Front Street, Cockburn Town, Grand Turk", emoji: "💼" },
  { id: 29, name: "Invest TCI — Heritage TCIslander Investment Incentive Policy (HTCIP)", category: "Business", islands: ["Turks & Caicos"], description: "Brand new November 2025 policy specifically designed to help Heritage TCIslanders own more of their own economy. Provides investment incentives for larger-scale business and real estate development across all islands.", eligibility: "Heritage TCI Islander status required. All business sectors eligible. Contact Invest TCI for free consultation.", contact: "investturksandcaicos.tc | CEO Mrs. Angela Musgrove", emoji: "🌴" },
  { id: 30, name: "TCI Community College — FREE Tuition", category: "Education", islands: ["Turks & Caicos"], description: "Since September 2022, tuition is COMPLETELY FREE for all Turks & Caicos Islanders and BOTC citizens at TCI Community College! Two campuses in Grand Turk and Providenciales. Associate degrees, Bachelor's degrees, vocational programs. Most people on the island don't know this!", eligibility: "TCI Islander or BOTC status. Small application fee ($25 before July 14, $50 after). Apply at tcicc.edu.tc", contact: "tcicc.edu.tc | Grand Turk Campus | Providenciales Campus", emoji: "🎓" },
  { id: 31, name: "TCI Senior Citizens Financial Assistance Programme (FAP)", category: "Grants", islands: ["Turks & Caicos"], description: "Monthly pension top-up to ensure all TCI seniors receive at least $1,000 per month. If your pension is below $1,000 the government tops it up. If you have NO pension at all you receive the full $1,000. Payments made monthly. Most eligible seniors haven't applied!", eligibility: "TCI Islander or BOTC status. Age 70+. Ordinarily resident in TCI for last 5 years. Pension below $1,000/month.", contact: "seniorcitizensfap.gov.tc | Ministry of Finance offices | Treasury locations across TCI", emoji: "👴🏾" },
  { id: 32, name: "TCI Mental Health & Substance Dependence Department", category: "Healthcare", islands: ["Turks & Caicos"], description: "FREE government mental health services for ALL ages in TCI. Covers mental illness, emotional disturbance, substance use disorders, counseling, psychiatric services and crisis intervention. Completely confidential.", eligibility: "All TCI residents of all ages. No cost. No referral needed for initial contact.", contact: "gov.tc/dmhsd | Ministry of Health offices Grand Turk and Providenciales", emoji: "🧠" },
  { id: 33, name: "TCI Chevening Scholarship — Study in the UK", category: "Education", islands: ["Turks & Caicos"], description: "UK government fully-funded scholarship for outstanding TCIslanders to study a Master's degree at any UK university. Covers tuition, living expenses, flights and more. One of the most prestigious scholarships in the world — and it's available to TCI!", eligibility: "TCI Islander. Undergraduate degree required. At least 2 years work experience. Apply at chevening.org/scholarship/turks-and-caicos-islands", contact: "chevening.org/scholarship/turks-and-caicos-islands | UK Foreign Office", emoji: "🇬🇧" },
  { id: 34, name: "TCI National Internship & Apprentice Program (NIAP)", category: "Education", islands: ["Turks & Caicos"], description: "Government program aligning TCIslander students and graduates with paid work experience and soft skills training in their field. Over 200 students placed. Includes personal development workshops on branding, productivity and career development.", eligibility: "All TCI Islanders and BOTC students and graduates, both local and abroad. Register through Ministry of Education.", contact: "gov.tc/education | Ministry of Education, Youth, Sports & Social Services", emoji: "💼" },
  { id: 35, name: "TCI Special Needs Unit — Disability Support", category: "Healthcare", islands: ["Turks & Caicos"], description: "Government unit providing support services for persons with disabilities and special needs in TCI. Covers children and adults with physical, developmental, and learning disabilities. Scholarships also available for special needs students.", eligibility: "All TCI residents with disabilities or special needs. Children and adults eligible. No cost for assessment.", contact: "gov.tc/moh | Ministry of Health Special Needs Unit | +1-649-941-2800", emoji: "♿" },
  { id: 36, name: "TCI National HIV Prevention Unit — Free Testing & Support", category: "Healthcare", islands: ["Turks & Caicos"], description: "Free and confidential HIV testing, prevention education, counseling, and support services across TCI. Also covers sexually transmitted infections (STIs). Completely free and confidential for all residents.", eligibility: "All TCI residents. Completely free and confidential. No appointment required for testing.", contact: "gov.tc/moh | National HIV Prevention Unit | Ministry of Health offices", emoji: "🏥" },
  { id: 37, name: "TCI Environmental Health Department — Free Inspections", category: "Healthcare", islands: ["Turks & Caicos"], description: "Free environmental health inspections, food safety enforcement, vector control (mosquitoes, rats), sanitation services and public health complaints handling. Call if you have health hazards in your community.", eligibility: "All TCI residents. Free government service. Report environmental health hazards at any time.", contact: "gov.tc/moh | Environmental Health Department | Ministry of Health", emoji: "🌿" },

  { id: 38, name: "TCI/BOTC — Right to Live & Work in the UK", category: "Grants", islands: ["Turks & Caicos"], description: "As a British Overseas Territory, most TCIslanders automatically became British citizens on May 21 2002 — giving them the full right to live and work anywhere in the UK. If you were born in TCI and have BOTC status you may already be a British citizen without knowing it!", eligibility: "TCIslanders and BOTC citizens born before or after May 21 2002. Check your status at gov.uk/types-of-british-nationality/british-overseas-territories-citizen", contact: "gov.uk/types-of-british-nationality | UK Home Office | TCI Department of Citizenship & Naturalization", emoji: "🇬🇧" },
  { id: 39, name: "UK NHS — Free Healthcare for TCI British Citizens", category: "Healthcare", islands: ["Turks & Caicos"], description: "TCIslanders who are British citizens living in the UK have full access to the NHS — free doctor visits, free hospital treatment, free specialist referrals. Register with a local GP as soon as you arrive in the UK. This is your right as a British citizen.", eligibility: "British citizens and permanent UK residents. Register with a local GP to access all NHS services. Free at point of use.", contact: "nhs.uk | Register with your local GP in the UK | 111 for urgent care", emoji: "🏥" },
  { id: 40, name: "UK Student Finance — Loans & Grants for TCI Students", category: "Education", islands: ["Turks & Caicos"], description: "TCIslanders who are British citizens living in the UK can access UK Student Finance for university — tuition fee loans up to £9,535/year AND maintenance loans up to £13,762/year (London). You don't pay back until you're earning. Most TCI families in the UK don't know their children qualify!", eligibility: "British citizens ordinarily resident in UK for 3 years before course. Apply at gov.uk/student-finance. Must be studying at UK university.", contact: "gov.uk/student-finance | Student Finance England: 0300 100 0607", emoji: "🎓" },
  { id: 41, name: "UK Chevening Scholarship — Fully Funded Master's Degree", category: "Education", islands: ["Turks & Caicos"], description: "UK government scholarship for outstanding TCIslanders to study a Master's degree at ANY UK university. Covers full tuition, monthly living allowance, return flights, and travel grants. One of the world's most prestigious scholarships — open to TCI!", eligibility: "TCI Islander. Must have undergraduate degree AND at least 2 years work experience. Apply at chevening.org. Highly competitive.", contact: "chevening.org/scholarship/turks-and-caicos-islands | UK Foreign Commonwealth Office", emoji: "🎓" },
  { id: 42, name: "UK Universal Credit — Benefits for TCI Citizens in UK", category: "Grants", islands: ["Turks & Caicos"], description: "TCIslanders who are British citizens living in the UK and working or looking for work may qualify for Universal Credit — the UK's main welfare benefit covering housing costs, childcare, and living costs. Many TCI families in the UK are entitled to this but never apply.", eligibility: "British citizens living in UK. Working or looking for work. Income and savings below threshold. Apply at gov.uk/universal-credit", contact: "gov.uk/universal-credit | UK Department for Work and Pensions | 0800 328 5644", emoji: "💰" },
  { id: 43, name: "UK Child Benefit — For TCI Families in UK", category: "Grants", islands: ["Turks & Caicos"], description: "TCIslander British citizen families in the UK receive Child Benefit for every child under 16 (or under 20 if in education or training). Currently £25.60/week for first child, £16.95/week for additional children. Tax-free cash payment every 4 weeks.", eligibility: "British citizens living in UK responsible for a child under 16. Apply online at gov.uk/child-benefit. No means test for basic amount.", contact: "gov.uk/child-benefit | HMRC Child Benefit Office | 0300 200 3100", emoji: "👶" },

  // ── GRENADA ──
  { id: 44, name: "Grenada SEED Programme — Cash Assistance", category: "Grants", islands: ["Grenada"], description: "Grenada's main social safety net combining Public Assistance, Necessitous Funds and School Transportation into one. Monthly cash assistance from EC$50 to EC$700 for the poorest and most vulnerable Grenadian households. Over 7,700 beneficiaries. Covers food, health and education support.", eligibility: "Grenadian citizens in poverty or vulnerable situations. Elderly, disabled, single parents and children prioritized. Apply at Ministry of Social Development.", contact: "gov.gd | Ministry of Social Development and Housing | St. George's", emoji: "🍽️" },
  { id: 45, name: "Grenada NIS — Unemployment Insurance Benefit", category: "Grants", islands: ["Grenada"], description: "Grenada launched a PERMANENT Unemployment Insurance Benefit Programme in 2025 — one of the few Caribbean islands with this. If you lose your job in Grenada you are NOW entitled to unemployment benefits. Also covers retirement pension, sickness and maternity benefits.", eligibility: "All employed Grenadians who contribute to NIS. Unemployment benefit available upon job loss. Apply at National Insurance Scheme offices.", contact: "nis.gov.gd | NIS offices across Grenada | St. George's", emoji: "🏦" },
  { id: 46, name: "Grenada Hurricane Beryl Recovery Grants", category: "Emergency Aid", islands: ["Grenada"], description: "Grenada pumped over EC$100 million in relief for Hurricane Beryl victims — cash grants, building materials for roof repairs, new home construction, and business reactivation support especially for Carriacou and Petite Martinique. EC$27 million allocated for housing in 2025 budget.", eligibility: "Grenadian residents affected by Hurricane Beryl. Priority for Carriacou and Petite Martinique residents. Apply through Ministry of Social Development.", contact: "gov.gd | Ministry of Social Development | Disaster Management office", emoji: "🆘" },

  // ── SAINT LUCIA ──
  { id: 47, name: "Saint Lucia Public Assistance Programme (PAP)", category: "Grants", islands: ["Saint Lucia"], description: "Saint Lucia's main social welfare programme providing financial assistance to the poorest and most vulnerable. Covers financial assistance, housing support, health assistance and education benefits. Managed by Ministry of Social Transformation.", eligibility: "Saint Lucian citizens in poverty or vulnerable situations. Elderly, disabled, single parents and children prioritized. Apply at nearest Social Welfare office.", contact: "govt.lc | Ministry of Social Transformation | Castries", emoji: "🤝" },
  { id: 48, name: "Saint Lucia Social Development Fund (SSDF)", category: "Grants", islands: ["Saint Lucia"], description: "Government agency providing community development grants, poverty reduction programs, HOPE empowerment initiative, and Basic Needs Trust Fund support. Funds education, health and socio-economic programs for vulnerable Saint Lucians.", eligibility: "Saint Lucian citizens and community organizations. Vulnerable households prioritized. Apply through SSDF offices.", contact: "slusdf.net | St. Lucia Social Development Fund | Castries", emoji: "💰" },
  { id: 49, name: "Saint Lucia Education Benefits 2025", category: "Education", islands: ["Saint Lucia"], description: "Every Form 1 secondary school student gets a FREE laptop and $500 bursary. Government pays ALL facility fees for public primary AND secondary school students. Teachers receive $1,400 teaching material allowance. Government now covers cost of up to 4 CXC subjects for graduating students!", eligibility: "All Saint Lucian students in public primary and secondary schools. Form 1 students receive laptop automatically. Free for all public school students.", contact: "education.govt.lc | Ministry of Education | 758-468-5200", emoji: "🎓" },

  // ── GUYANA ──
  { id: 50, name: "Guyana 'Because We Care' School Grant", category: "Education", islands: ["Guyana"], description: "Every school-aged child in Guyana receives GYD$55,000 annually — GYD$50,000 cash grant plus GYD$5,000 uniform voucher. Over 205,000 students benefit. Distributed phased starting from hinterland regions to ensure no child is left behind.", eligibility: "All Guyanese school-aged children enrolled in school. Automatic — no application needed. Distributed by Ministry of Education.", contact: "moe.gov.gy | Ministry of Education Guyana | Georgetown", emoji: "🎓" },
  { id: 51, name: "Guyana Senior Citizens Pension", category: "Grants", islands: ["Guyana"], description: "All Guyanese citizens aged 65 and over are eligible for a government pension. Apply through the Ministry of Human Services and Social Security. Don't wait — apply as soon as you turn 65.", eligibility: "Guyanese citizens aged 65+. Apply at Ministry of Human Services offices across Guyana.", contact: "mhsss.gov.gy | Ministry of Human Services and Social Security | Georgetown", emoji: "👴🏾" },
  { id: 52, name: "Guyana Persons with Disabilities (PWD) Cash Grant", category: "Grants", islands: ["Guyana"], description: "Cash grants available for Guyanese living with temporary or permanent disabilities to ease financial burden and improve quality of life. Apply through Ministry of Human Services and Social Security.", eligibility: "Guyanese citizens with certified temporary or permanent disabilities. Apply at Ministry of Human Services offices.", contact: "mhsss.gov.gy | Ministry of Human Services and Social Security | 592-225-6532", emoji: "♿" },

  // ── OECS FREE MOVEMENT ──
  { id: 53, name: "OECS Free Movement — Live & Work Across 6 Islands", category: "Grants", islands: ["Saint Lucia", "Grenada", "Antigua & Barbuda", "St. Kitts & Nevis", "St. Vincent & the Grenadines", "Dominica"], description: "The OECS Free Movement Agreement allows citizens of Antigua & Barbuda, Dominica, Grenada, Saint Lucia, St. Kitts & Nevis, and St. Vincent to live, work and travel freely across ALL member states — NO work permit or residency visa needed! Most people don't know they can just move!", eligibility: "Citizens of any OECS member state. Use your national ID card. No work permit needed. No visa needed.", contact: "oecs.org | Organisation of Eastern Caribbean States | oecs@oecs.org", emoji: "🌴" },

  // ── CARIBBEAN CULTURE FUND ──
  { id: 54, name: "Caribbean Culture Fund — Creative Grants", category: "Grants", islands: ["All Caribbean"], description: "USD $400,000 in grants for Caribbean creative and cultural projects. Art for Change grants of USD$10,000 each. Caribbean Collaboration grants of USD$25,000 each. Open to individuals, organizations and institutions across the Caribbean including Haiti.", eligibility: "Caribbean individuals, organizations and institutions working in arts and culture. Apply at caribbeanculturefund.org when next call opens.", contact: "caribbeanculturefund.org | Caribbean Culture Fund", emoji: "🎨" },

  // ── ALL CARIBBEAN ──
  { id: 26, name: "Caribbean Disaster Emergency Management Agency (CDEMA)", category: "Emergency Aid", islands: ["All Caribbean"], description: "Regional disaster management and emergency response across all Caribbean islands. Coordinates emergency relief, recovery funds, and disaster preparedness programs for hurricanes, floods, and other natural disasters.", eligibility: "All Caribbean residents affected by declared natural disasters.", contact: "cdema.org | cdema@cdema.org | +1-246-434-4880", emoji: "🆘" },
  { id: 27, name: "Caribbean Development Bank — Community Grants", category: "Grants", islands: ["All Caribbean"], description: "The Caribbean Development Bank funds social programs, infrastructure, education and business development across all member countries. Grants and technical assistance available to community organizations and governments.", eligibility: "Caribbean organizations, NGOs, and government agencies. Individual applications through national governments.", contact: "caribank.org | +1-246-431-1600", emoji: "🌴" },
];

const categories = ["All", "Housing", "Healthcare", "Education", "Grants", "Emergency Aid", "Business"];
const islandFilters = ["All Islands", "All Caribbean", "Turks & Caicos", "Jamaica", "Trinidad and Tobago", "Barbados", "Saint Lucia", "Grenada", "Bahamas", "Dominican Republic", "Guyana", "Haiti", "Antigua & Barbuda", "St. Kitts & Nevis", "St. Vincent & the Grenadines", "Dominica"];
const categoryColors = { Housing: "#4ade80", Business: "#60a5fa", Healthcare: "#c084fc", Education: "#fb923c", "Emergency Aid": "#f87171", Grants: "#34d399" };

const mockParties = [
  { id: 1, name: "Miss Gloria's Surgery Fund", creator: "Keisha M.", island: "Jamaica 🇯🇲", goal: 3000, raised: 2140, contributors: 47, emoji: "💊", daysLeft: 8, description: "Help Miss Gloria cover her surgery costs. She raised 6 children alone and needs our support now." },
  { id: 2, name: "Back to School Drive", creator: "Community TT", island: "Trinidad 🇹🇹", goal: 1500, raised: 890, contributors: 31, emoji: "📚", daysLeft: 14, description: "Uniforms, books, and supplies for 20 children in Laventille." },
  { id: 3, name: "Hurricane Ian Rebuild", creator: "St. Lucia Relief", island: "Saint Lucia 🇱🇨", goal: 8000, raised: 5600, contributors: 112, emoji: "🏠", daysLeft: 21, description: "Rebuilding 3 homes destroyed by the last storm. Every dollar goes directly to materials." },
  { id: 4, name: "Grandma Eunice 80th Birthday 🎉", creator: "The Williams Family", island: "Barbados 🇧🇧", goal: 500, raised: 500, contributors: 22, emoji: "🎂", daysLeft: 0, description: "We threw Grandma the best 80th birthday party! Thanks everyone — she cried happy tears." },
];
const mockContacts = [
  { name: "Mum", island: "Jamaica 🇯🇲", avatar: "👩🏾" }, { name: "Aunty Pat", island: "Barbados 🇧🇧", avatar: "👩🏿" },
  { name: "Devon", island: "Trinidad 🇹🇹", avatar: "👨🏾" }, { name: "Stacy", island: "Grenada 🇬🇩", avatar: "👩🏽" },
  { name: "Uncle Roy", island: "St. Lucia 🇱🇨", avatar: "👨🏿" },
];
const inputStyle = { width: "100%", padding: "11px 16px", borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" };

// ── WEALTH SCREEN ─────────────────────────────────────────────────────────────
function WealthScreen() {
  const [selectedId, setSelectedId] = useState<any>(null);
  const [activeTopic, setActiveTopic] = useState("health");
  const [view, setView] = useState("islands");
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [search, setSearch] = useState("");

  const island = wealthData.find(i => i.id === selectedId);
  const filtered = wealthData.filter(i => i.island.toLowerCase().includes(search.toLowerCase()));
  const fullIslands = filtered.filter(i => i.status === "full");
  const comingIslands = filtered.filter(i => i.status === "coming");

  const renderTopicContent = () => {
    if (!island) return null;
    const data = (island as any)[activeTopic];
    if (!data) return <div style={{ color: "#64748b", fontSize: 13, padding: "20px 0" }}>Coming soon.</div>;
    if (activeTopic === "health" || activeTopic === "retirement") {
      return (
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 18, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ color: "#fff", fontWeight: "bold", fontSize: 15, marginBottom: 8 }}>{data.name}</div>
          <div style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>{data.detail}</div>
          <div style={{ color: "#60a5fa", fontSize: 12 }}>🔗 {data.link}</div>
        </div>
      );
    }
    if (Array.isArray(data)) {
      if (data.length === 0) return <div style={{ color: "#64748b", fontSize: 13, padding: "12px 0" }}>Coming soon for this island.</div>;
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.map((item, i) => (
            <div key={String(i)} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14, marginBottom: 6 }}>{item.name}</div>
              <div style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.6, marginBottom: 6 }}>{item.detail}</div>
              {item.rate && <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 50, background: "rgba(74,222,128,0.15)", color: "#4ade80", fontSize: 11, fontFamily: "monospace", marginBottom: 4 }}>📈 {item.rate}</div>}
              {item.contact && <div style={{ color: "#60a5fa", fontSize: 12 }}>🔗 {item.contact}</div>}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (view === "learn") {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 120px" }}>
        <div style={{ padding: "24px 0 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => { setView("islands"); setSelectedLesson(null); }} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "6px 14px", color: "#94a3b8", cursor: "pointer", fontSize: 13 }}>← Back</button>
          <div style={{ color: "#fbbf24", fontSize: 13, fontFamily: "monospace" }}>FINANCIAL 101</div>
        </div>
        {selectedLesson !== null ? (
          <div>
            <button onClick={() => setSelectedLesson(null as any)} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "6px 14px", color: "#94a3b8", cursor: "pointer", fontSize: 13, marginBottom: 16 }}>← All Lessons</button>
            <div style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{financeLessons[selectedLesson].emoji}</div>
              <div style={{ color: "#fbbf24", fontWeight: "bold", fontSize: 18, marginBottom: 16 }}>{financeLessons[selectedLesson].title}</div>
              <div style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.8 }}>{financeLessons[selectedLesson].content}</div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {financeLessons.map((lesson, i) => (
              <div key={String(i)} onClick={() => setSelectedLesson(i as any)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(251,191,36,0.15)", borderRadius: 14, padding: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontSize: 28 }}>{lesson.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{lesson.title}</div>
                  <div style={{ color: "#64748b", fontSize: 12, marginTop: 3 }}>Tap to read →</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (view === "detail" && island) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 120px" }}>
        <div style={{ padding: "24px 0 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setView("islands")} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "6px 14px", color: "#94a3b8", cursor: "pointer", fontSize: 13 }}>← Islands</button>
          <div style={{ fontSize: 22 }}>{island.flag}</div>
          <div style={{ color: "#fff", fontSize: 18 }}>{island.island}</div>
        </div>
        <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 14, padding: "12px 16px", marginBottom: 20 }}>
          <div style={{ color: "#fbbf24", fontSize: 12, fontFamily: "monospace", marginBottom: 4 }}>💡 DID YOU KNOW?</div>
          <div style={{ color: "#fde68a", fontSize: 13, lineHeight: 1.6 }}>{island.funFact}</div>
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 20 }}>
          {financeTopics.map(t => (
            <button key={t.id} onClick={() => setActiveTopic(t.id)} style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 50, border: "1px solid", borderColor: activeTopic === t.id ? t.color : "rgba(255,255,255,0.1)", background: activeTopic === t.id ? `${t.color}20` : "transparent", color: activeTopic === t.id ? t.color : "#64748b", cursor: "pointer", fontSize: 12, fontWeight: activeTopic === t.id ? "bold" : "normal", whiteSpace: "nowrap" }}>
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
        <div style={{ color: "#fff", fontWeight: "bold", fontSize: 13, marginBottom: 14, fontFamily: "monospace" }}>
          {financeTopics.find(t => t.id === activeTopic)?.emoji} {financeTopics.find(t => t.id === activeTopic)?.label?.toUpperCase()}
        </div>
        {renderTopicContent()}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 120px" }}>
      <div style={{ padding: "28px 0 20px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 50, padding: "6px 16px", marginBottom: 14 }}>
          <span>💰</span><span style={{ fontSize: 12, letterSpacing: 3, color: "#fbbf24", fontFamily: "monospace", fontWeight: "bold" }}>FINANCE & WEALTH</span>
        </div>
        <h2 style={{ color: "#fff", fontWeight: "normal", fontSize: 24, margin: "0 0 6px" }}>Know Your Money. Build Your Legacy.</h2>
        <p style={{ color: "#fcd34d", fontSize: 13, margin: 0 }}>Insurance · Retirement · Savings · Financial Literacy 🌴</p>
      </div>

      <div onClick={() => setView("learn")} style={{ background: "linear-gradient(135deg,#78350f,#92400e)", borderRadius: 16, padding: "16px 20px", marginBottom: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 20px rgba(251,191,36,0.15)" }}>
        <div>
          <div style={{ color: "#fbbf24", fontWeight: "bold", fontSize: 15, marginBottom: 4 }}>📚 Caribbean Financial 101</div>
          <div style={{ color: "#fde68a", fontSize: 13 }}>Life insurance, credit, wills, savings — explained simply</div>
          <div style={{ color: "#fbbf24", fontSize: 11, marginTop: 6, fontFamily: "monospace" }}>{financeLessons.length} lessons · Free forever</div>
        </div>
        <div style={{ fontSize: 30 }}>→</div>
      </div>

      <div style={{ position: "relative", marginBottom: 16 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search islands..." style={{ ...inputStyle, paddingLeft: 40, border: "1px solid rgba(251,191,36,0.2)" }} />
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
      </div>

      <div style={{ color: "#fcd34d", fontSize: 12, fontFamily: "monospace", marginBottom: 12 }}>
        {wealthData.filter(i => i.status === "full").length} ISLANDS WITH FULL DATA · {wealthData.filter(i => i.status === "coming").length} COMING SOON
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {fullIslands.map(isl => (
          <div key={isl.id} onClick={() => { setSelectedId(isl.id); setActiveTopic("health"); setView("detail"); }} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(251,191,36,0.15)", borderRadius: 14, padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>{isl.flag}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{isl.island}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 5, flexWrap: "wrap" }}>
                {["🏥 Health", "🏦 Retirement", "💀 Insurance", "💰 Savings"].map(tag => (
                  <span key={tag} style={{ fontSize: 9, padding: "2px 7px", borderRadius: 50, background: "rgba(251,191,36,0.1)", color: "#fbbf24", fontFamily: "monospace" }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ color: "#fbbf24", fontSize: 18 }}>→</div>
          </div>
        ))}
        {comingIslands.length > 0 && (
          <>
            <div style={{ color: "#475569", fontSize: 11, fontFamily: "monospace", padding: "8px 0 4px" }}>COMING SOON</div>
            {comingIslands.map(isl => (
              <div key={isl.id} onClick={() => { setSelectedId(isl.id); setActiveTopic("health"); setView("detail"); }} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, opacity: 0.7 }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{isl.flag}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#94a3b8", fontWeight: "bold", fontSize: 14 }}>{isl.island}</div>
                  <div style={{ color: "#475569", fontSize: 11, marginTop: 3 }}>Tap to preview available info</div>
                </div>
                <div style={{ fontSize: 10, padding: "3px 8px", borderRadius: 50, background: "rgba(255,255,255,0.06)", color: "#475569", fontFamily: "monospace" }}>SOON</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ── ISLANDPACT PAY ────────────────────────────────────────────────────────────
function IslandpactPayScreen() {
  const [tab, setTab] = useState("parties");
  const [sendAmt, setSendAmt] = useState(""); const [sendTo, setSendTo] = useState<any>(null); const [sendDone, setSendDone] = useState(false);
  const [createOpen, setCreateOpen] = useState(false); const [partyName, setPartyName] = useState(""); const [partyGoal, setPartyGoal] = useState(""); const [partyDesc, setPartyDesc] = useState("");
  const [parties, setParties] = useState(mockParties); const [contributeId, setContributeId] = useState<any>(null); const [contributeAmt, setContributeAmt] = useState("");
  const handleSend = () => { if (sendAmt && sendTo) setSendDone(true); };
  const handleCreate = () => { if (!partyName || !partyGoal) return; setParties([{ id: parties.length + 1, name: partyName, creator: "You", island: "All Caribbean 🌴", goal: parseFloat(partyGoal), raised: 0, contributors: 0, emoji: "🎉", daysLeft: 30, description: partyDesc || "Help us reach our goal!" }, ...parties]); setCreateOpen(false); setPartyName(""); setPartyGoal(""); setPartyDesc(""); };
  const handleContribute = (id) => { if (!contributeAmt) return; setParties(prev => prev.map(p => p.id === id ? { ...p, raised: Math.min(p.raised + parseFloat(contributeAmt), p.goal), contributors: p.contributors + 1 } : p)); setContributeId(null); setContributeAmt(""); };
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 120px" }}>
      <div style={{ padding: "28px 0 20px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", borderRadius: 50, padding: "6px 16px", marginBottom: 14 }}><span>🌊</span><span style={{ fontSize: 12, letterSpacing: 3, color: "#22d3ee", fontFamily: "monospace", fontWeight: "bold" }}>ISLANDPACT PAY</span></div>
        <h2 style={{ color: "#fff", fontWeight: "normal", fontSize: 26, margin: "0 0 6px" }}>The Caribbean's own Zelle. 🌴</h2>
        <p style={{ color: "#67e8f9", fontSize: 14, margin: 0 }}>No Western Union. No MoneyGram. No CAM. No big fees. Just a pact. 🌴</p>
      </div>
      <div style={{ background: "linear-gradient(135deg,#0c4a6e,#0e7490,#0891b2)", borderRadius: 20, padding: "22px 26px", marginBottom: 22, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 8px 32px rgba(6,182,212,0.25)" }}>
        <div><div style={{ fontSize: 11, color: "#a5f3fc", fontFamily: "monospace", marginBottom: 6, letterSpacing: 2 }}>YOUR ISLANDPACT WALLET</div><div style={{ fontSize: 38, fontWeight: "bold", color: "#fff" }}>$247.50</div><div style={{ fontSize: 12, color: "#cffafe", marginTop: 4 }}>Available to send · Updated just now</div></div>
        <div style={{ textAlign: "right" }}><div style={{ fontSize: 40 }}>🌊</div><div style={{ fontSize: 10, color: "#a5f3fc", fontFamily: "monospace", marginTop: 4 }}>ISLANDPACT PAY</div></div>
      </div>
      {/* FEES BANNER */}
      <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 16, padding: "14px 18px", marginBottom: 18 }}>
        <div style={{ color: "#4ade80", fontWeight: "bold", fontSize: 13, marginBottom: 10 }}>💸 Islandpact Pay Fees</div>
        {[["Send money Caribbean to Caribbean", "FREE (Beta)", true], ["Money Party contributions", "FREE", true], ["Receiving money", "FREE", true], ["Future international transfers", "Low fee — always less than Western Union", false]].map(([service, fee, free]) => (
          <div key={service} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ color: "#94a3b8", fontSize: 12 }}>{service}</div>
            <div style={{ color: free ? "#4ade80" : "#fbbf24", fontSize: 12, fontWeight: "bold", fontFamily: "monospace" }}>{fee}</div>
          </div>
        ))}
        <div style={{ color: "#67e8f9", fontSize: 11, marginTop: 10, lineHeight: 1.6 }}>
          🌴 No Western Union. No MoneyGram. No CAM. No Zelle US bank account required. No big fees. Caribbean to Caribbean — built for us, by us.
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
        {[["parties", "🎉 Money Parties"], ["send", "💸 Send Money"], ["activity", "📋 Activity"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{ flex: 1, padding: "10px 6px", borderRadius: 50, border: "1px solid", borderColor: tab === key ? "#22d3ee" : "rgba(6,182,212,0.2)", background: tab === key ? "#22d3ee" : "transparent", color: tab === key ? "#0a1628" : "#67e8f9", cursor: "pointer", fontSize: 12, fontWeight: tab === key ? "bold" : "normal" }}>{label}</button>
        ))}
      </div>
      {tab === "parties" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ color: "#67e8f9", fontSize: 13, fontFamily: "monospace" }}>{parties.length} active parties</div>
            <button onClick={() => setCreateOpen(true)} style={{ padding: "8px 20px", borderRadius: 50, background: "#22d3ee", border: "none", color: "#0a1628", fontWeight: "bold", fontSize: 13, cursor: "pointer" }}>+ Start a Party</button>
          </div>
          {createOpen && (<div style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.3)", borderRadius: 16, padding: 18, marginBottom: 14 }}>
            <div style={{ color: "#22d3ee", fontWeight: "bold", marginBottom: 14 }}>🎉 Start a New Money Party</div>
            <input value={partyName} onChange={e => setPartyName(e.target.value)} placeholder="Party name" style={{ ...inputStyle, border: "1px solid rgba(6,182,212,0.25)" }} />
            <input value={partyGoal} onChange={e => setPartyGoal(e.target.value)} placeholder="Goal amount" type="number" style={{ ...inputStyle, border: "1px solid rgba(6,182,212,0.25)", marginTop: 8 }} />
            <textarea value={partyDesc} onChange={e => setPartyDesc(e.target.value)} placeholder="Tell people what this is for..." style={{ ...inputStyle, border: "1px solid rgba(6,182,212,0.25)", marginTop: 8, height: 68, resize: "none" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={handleCreate} style={{ flex: 1, padding: 10, borderRadius: 50, background: "#22d3ee", border: "none", color: "#0a1628", fontWeight: "bold", cursor: "pointer" }}>Create 🎉</button>
              <button onClick={() => setCreateOpen(false)} style={{ padding: "10px 18px", borderRadius: 50, background: "transparent", border: "1px solid rgba(6,182,212,0.3)", color: "#67e8f9", cursor: "pointer" }}>Cancel</button>
            </div>
          </div>)}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {parties.map(p => { const pct = Math.min(Math.round((p.raised / p.goal) * 100), 100); const done = p.raised >= p.goal; return (
              <div key={p.id} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${done ? "rgba(74,222,128,0.4)" : "rgba(6,182,212,0.15)"}`, borderRadius: 16, padding: 18 }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}><div style={{ fontSize: 28 }}>{p.emoji}</div><div style={{ flex: 1 }}><div style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{p.name}</div><div style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>by {p.creator} · {p.island}</div><div style={{ color: "#cbd5e1", fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{p.description}</div></div></div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ color: done ? "#4ade80" : "#22d3ee", fontWeight: "bold" }}>${p.raised.toLocaleString()} raised</span><span style={{ color: "#64748b", fontSize: 13 }}>of ${p.goal.toLocaleString()} · {p.contributors} ppl</span></div>
                  <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 50, overflow: "hidden" }}><div style={{ height: "100%", width: `${pct}%`, background: done ? "linear-gradient(90deg,#4ade80,#22c55e)" : "linear-gradient(90deg,#22d3ee,#0891b2)", borderRadius: 50 }} /></div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}><span style={{ color: "#64748b", fontSize: 11 }}>{pct}% funded</span><span style={{ color: "#64748b", fontSize: 11 }}>{done ? "✅ Goal reached!" : `${p.daysLeft} days left`}</span></div>
                </div>
                {!done && (contributeId === p.id ? (<div style={{ display: "flex", gap: 8 }}><input value={contributeAmt} onChange={e => setContributeAmt(e.target.value)} placeholder="Amount $" type="number" style={{ ...inputStyle, flex: 1, border: "1px solid rgba(6,182,212,0.25)" }} /><button onClick={() => handleContribute(p.id)} style={{ padding: "10px 16px", borderRadius: 50, background: "#22d3ee", border: "none", color: "#0a1628", fontWeight: "bold", cursor: "pointer" }}>Send 💸</button><button onClick={() => setContributeId(null)} style={{ padding: 10, borderRadius: 50, background: "transparent", border: "1px solid rgba(6,182,212,0.2)", color: "#67e8f9", cursor: "pointer" }}>✕</button></div>) : (<button onClick={() => setContributeId(p.id)} style={{ width: "100%", padding: 10, borderRadius: 50, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", color: "#22d3ee", cursor: "pointer", fontSize: 13, fontWeight: "bold" }}>🌊 Contribute to this Party</button>))}
                {done && <div style={{ textAlign: "center", color: "#4ade80", fontSize: 13, fontWeight: "bold" }}>🎉 This party reached its goal!</div>}
              </div>
            ); })}
          </div>
        </div>
      )}
      {tab === "send" && (
        <div>
          {sendDone ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: 72, marginBottom: 16 }}>✅</div>
              <div style={{ color: "#4ade80", fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>Wave Sent!</div>
              <div style={{ color: "#94a3b8", fontSize: 15, marginBottom: 8 }}>${sendAmt} sent to {sendTo?.name} in {sendTo?.island}</div>
              <div style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 12, padding: "12px 20px", display: "inline-block", marginBottom: 28 }}><div style={{ color: "#22d3ee", fontSize: 13, fontFamily: "monospace" }}>Powered by Islandpact Pay 🌊</div><div style={{ color: "#67e8f9", fontSize: 12, marginTop: 2 }}>No Western Union. No big fees. Just a pact.</div></div>
              <br /><button onClick={() => { setSendDone(false); setSendAmt(""); setSendTo(null); }} style={{ padding: "12px 32px", borderRadius: 50, background: "#22d3ee", border: "none", color: "#0a1628", fontWeight: "bold", cursor: "pointer" }}>Send Another Wave</button>
            </div>
          ) : (
            <div>
              <div style={{ color: "#67e8f9", fontSize: 13, fontFamily: "monospace", marginBottom: 14 }}>SELECT RECIPIENT</div>
              <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 12, marginBottom: 20 }}>
                {mockContacts.map(c => (<div key={c.name} onClick={() => setSendTo(c)} style={{ flexShrink: 0, textAlign: "center", cursor: "pointer", padding: "12px 14px", borderRadius: 16, background: sendTo?.name === c.name ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${sendTo?.name === c.name ? "#22d3ee" : "rgba(255,255,255,0.08)"}`, minWidth: 76 }}><div style={{ fontSize: 30, marginBottom: 4 }}>{c.avatar}</div><div style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>{c.name}</div><div style={{ color: "#64748b", fontSize: 10, marginTop: 2 }}>{c.island}</div></div>))}
              </div>
              {sendTo ? (
                <div style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 16, padding: 20 }}>
                  <div style={{ color: "#67e8f9", fontSize: 13, marginBottom: 12 }}>Sending to <strong style={{ color: "#22d3ee" }}>{sendTo.name}</strong> · {sendTo.island}</div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                    {["10", "25", "50", "100", "200"].map(amt => (<button key={amt} onClick={() => setSendAmt(amt)} style={{ padding: "8px 16px", borderRadius: 50, border: "1px solid", borderColor: sendAmt === amt ? "#22d3ee" : "rgba(6,182,212,0.2)", background: sendAmt === amt ? "#22d3ee" : "transparent", color: sendAmt === amt ? "#0a1628" : "#67e8f9", cursor: "pointer", fontSize: 13, fontWeight: "bold" }}>${amt}</button>))}
                  </div>
                  <input value={sendAmt} onChange={e => setSendAmt(e.target.value)} placeholder="Or enter custom amount..." type="number" style={{ ...inputStyle, border: "1px solid rgba(6,182,212,0.25)", marginBottom: 12 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "10px 14px", background: "rgba(74,222,128,0.08)", borderRadius: 10 }}><span>✅</span><span style={{ color: "#86efac", fontSize: 12 }}>No transfer fees · Instant delivery · Caribbean to Caribbean</span></div>
                  <button onClick={handleSend} disabled={!sendAmt} style={{ width: "100%", padding: 14, borderRadius: 50, background: sendAmt ? "#22d3ee" : "rgba(6,182,212,0.2)", border: "none", color: sendAmt ? "#0a1628" : "#64748b", fontWeight: "bold", fontSize: 15, cursor: sendAmt ? "pointer" : "default" }}>🌊 Send ${sendAmt || "..."} to {sendTo.name}</button>
                </div>
              ) : (<div style={{ textAlign: "center", padding: "40px 20px", color: "#4a5568" }}><div style={{ fontSize: 40, marginBottom: 12 }}>👆🏾</div><div>Tap someone above to send them a wave</div></div>)}
            </div>
          )}
        </div>
      )}
      {tab === "activity" && (
        <div>
          <div style={{ color: "#67e8f9", fontSize: 13, fontFamily: "monospace", marginBottom: 16 }}>RECENT ACTIVITY</div>
          {[{ emoji: "🌊", label: "Wave sent to Mum", sub: "Jamaica · 2 hours ago", amt: "-$50.00", color: "#f87171" }, { emoji: "📥", label: "Received from Stacy", sub: "Grenada · Yesterday", amt: "+$25.00", color: "#4ade80" }, { emoji: "🎉", label: "Contributed to Back to School Drive", sub: "Trinidad · 2 days ago", amt: "-$20.00", color: "#f87171" }, { emoji: "📥", label: "Received from Devon", sub: "Trinidad · 3 days ago", amt: "+$100.00", color: "#4ade80" }, { emoji: "🌊", label: "Wave sent to Aunty Pat", sub: "Barbados · 1 week ago", amt: "-$75.00", color: "#f87171" }].map((item, i) => (
            <div key={String(i)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: 22, width: 36, textAlign: "center" }}>{item.emoji}</div>
              <div style={{ flex: 1 }}><div style={{ color: "#e2e8f0", fontSize: 14 }}>{item.label}</div><div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{item.sub}</div></div>
              <div style={{ color: item.color, fontWeight: "bold", fontSize: 15 }}>{item.amt}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── RESOURCE SCREEN ───────────────────────────────────────────────────────────
function ResourceScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIsland, setSelectedIsland] = useState("All Islands");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<any>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([{ from: "ai", text: "Hello! I'm your Island Impact AI Guide 🌴 Tell me what you need — housing, health, business support, education, emergency aid, or financial guidance — and I'll help you find it!" }]);
  const [loading, setLoading] = useState(false);
  const filtered = resources.filter(r => {
    const matchCat = selectedCategory === "All" || r.category === selectedCategory;
    const matchIsland = selectedIsland === "All Islands" || r.islands.includes(selectedIsland) || r.islands.includes("All Caribbean");
    const matchSearch = search === "" || r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchIsland && matchSearch;
  });
  const sendChat = async () => {
    if (!chatInput.trim() || loading) return;
    const userMsg = chatInput.trim(); setChatInput("");
    setChatMessages(prev => [...prev, { from: "user", text: userMsg }]); setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: `You are the Island Impact AI Guide — warm, helpful assistant for Caribbean residents. Resources: ${resources.map(r => `${r.name} (${r.category}, ${r.islands.join(", ")}): ${r.description}`).join("\n")}. Be concise and warm. Under 150 words.`, messages: [{ role: "user", content: userMsg }] }) });
      const data = await response.json();
      setChatMessages(prev => [...prev, { from: "ai", text: data.content?.[0]?.text || "Let me look into that for you!" }]);
    } catch { setChatMessages(prev => [...prev, { from: "ai", text: "Having trouble connecting. Try again!" }]); }
    setLoading(false);
  };
  return (
    <div>
      <div style={{ padding: "20px 24px 0", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ position: "relative", marginBottom: 14 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources..." style={{ width: "100%", padding: "13px 20px 13px 46px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 50, color: "#fff", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
          <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          {categories.map(cat => <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: "6px 14px", borderRadius: 50, border: "1px solid", borderColor: selectedCategory === cat ? "#4ade80" : "rgba(74,222,128,0.2)", background: selectedCategory === cat ? "#4ade80" : "transparent", color: selectedCategory === cat ? "#0a1628" : "#86efac", cursor: "pointer", fontSize: 12, fontWeight: selectedCategory === cat ? "bold" : "normal" }}>{cat}</button>)}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {islandFilters.map(isl => <button key={isl} onClick={() => setSelectedIsland(isl)} style={{ padding: "5px 12px", borderRadius: 50, border: "1px solid", borderColor: selectedIsland === isl ? "#60a5fa" : "rgba(96,165,250,0.2)", background: selectedIsland === isl ? "#60a5fa" : "transparent", color: selectedIsland === isl ? "#0a1628" : "#93c5fd", cursor: "pointer", fontSize: 11, fontWeight: selectedIsland === isl ? "bold" : "normal" }}>🏝 {isl}</button>)}
        </div>
        <div style={{ color: "#4ade80", fontSize: 12, fontFamily: "monospace", marginBottom: 14 }}>{filtered.length} resource{filtered.length !== 1 ? "s" : ""} found</div>
      </div>
      <div style={{ padding: "0 24px 120px", maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(r => { const accent = categoryColors[r.category] || "#4ade80"; const isOpen = expanded === r.id; return (
          <div key={r.id} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${isOpen ? accent : "rgba(255,255,255,0.08)"}`, borderRadius: 16, overflow: "hidden" }}>
            <div onClick={() => setExpanded(isOpen ? null : r.id)} style={{ padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `${accent}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{r.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", fontSize: 14, color: "#fff", marginBottom: 4 }}>{r.name}</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10, padding: "2px 9px", borderRadius: 50, background: `${accent}25`, color: accent, fontFamily: "monospace" }}>{r.category}</span>
                  {r.islands.map(isl => <span key={isl} style={{ fontSize: 10, padding: "2px 9px", borderRadius: 50, background: "rgba(96,165,250,0.15)", color: "#93c5fd", fontFamily: "monospace" }}>🏝 {isl}</span>)}
                </div>
              </div>
              <div style={{ color: accent, fontSize: 18, transform: isOpen ? "rotate(180deg)" : "none" }}>▾</div>
            </div>
            {isOpen && (<div style={{ padding: "0 18px 18px", borderTop: `1px solid ${accent}30` }}>
              <p style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.7, margin: "14px 0 10px" }}>{r.description}</p>
              <div style={{ background: `${accent}10`, borderRadius: 10, padding: "10px 14px", marginBottom: 10 }}><div style={{ fontSize: 10, color: accent, fontFamily: "monospace", marginBottom: 4 }}>ELIGIBILITY</div><div style={{ fontSize: 13, color: "#e2e8f0" }}>{r.eligibility}</div></div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>📬 {r.contact}</div>
              <button style={{ marginTop: 12, padding: "9px 22px", borderRadius: 50, background: accent, color: "#0a1628", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: 13 }}>Apply Now →</button>
            </div>)}
          </div>
        ); })}
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: "60px 20px", color: "#4ade80", opacity: 0.6 }}><div style={{ fontSize: 48, marginBottom: 16 }}>🌊</div><div>No resources found.</div></div>}
      </div>
      <button onClick={() => setChatOpen(!chatOpen)} style={{ position: "fixed", bottom: 88, right: 24, width: 54, height: 54, borderRadius: "50%", background: "linear-gradient(135deg,#4ade80,#22c55e)", border: "none", cursor: "pointer", fontSize: 22, boxShadow: "0 4px 20px rgba(74,222,128,0.4)", zIndex: 100 }}>{chatOpen ? "✕" : "🤖"}</button>
      {chatOpen && (<div style={{ position: "fixed", bottom: 154, right: 24, width: "min(340px,calc(100vw - 48px))", height: 420, borderRadius: 20, background: "#0d1f17", border: "1px solid rgba(74,222,128,0.3)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", zIndex: 100, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.08)" }}><div style={{ fontWeight: "bold", color: "#4ade80", fontSize: 13 }}>🌴 Island Impact AI Guide</div><div style={{ fontSize: 11, color: "#86efac", opacity: 0.7 }}>Powered by AI · Here to help</div></div>
        <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          {chatMessages.map((msg, i) => (<div key={String(i)} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}><div style={{ maxWidth: "85%", padding: "9px 13px", borderRadius: msg.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: msg.from === "user" ? "#4ade80" : "rgba(255,255,255,0.07)", color: msg.from === "user" ? "#0a1628" : "#e2e8f0", fontSize: 13, lineHeight: 1.6 }}>{msg.text}</div></div>))}
          {loading && <div style={{ display: "flex" }}><div style={{ padding: "9px 13px", borderRadius: "18px 18px 18px 4px", background: "rgba(255,255,255,0.07)", color: "#4ade80", fontSize: 13 }}>typing...</div></div>}
        </div>
        <div style={{ padding: 10, borderTop: "1px solid rgba(74,222,128,0.15)", display: "flex", gap: 8 }}>
          <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder="Ask about resources..." style={{ flex: 1, padding: "9px 13px", borderRadius: 50, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(74,222,128,0.2)", color: "#fff", fontSize: 13, outline: "none" }} />
          <button onClick={sendChat} disabled={loading} style={{ width: 34, height: 34, borderRadius: "50%", background: "#4ade80", border: "none", cursor: "pointer", fontSize: 14 }}>→</button>
        </div>
      </div>)}
    </div>
  );
}

// ── AUTH SCREEN ───────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("splash");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [island, setIsland] = useState(""); const [phone, setPhone] = useState(""); const [step, setStep] = useState(1); const [done, setDone] = useState(false);
  const islandList = ["Turks & Caicos 🇹🇨","Jamaica 🇯🇲","Trinidad & Tobago 🇹🇹","Barbados 🇧🇧","Saint Lucia 🇱🇨","Grenada 🇬🇩","The Bahamas 🇧🇸","Dominican Republic 🇩🇴","Guyana 🇬🇾","Haiti 🇭🇹","Antigua & Barbuda 🇦🇬","St. Kitts & Nevis 🇰🇳","St. Vincent & the Grenadines 🇻🇨","Dominica 🇩🇲","Cayman Islands 🇰🇾","Aruba 🇦🇼","Curaçao 🇨🇼","Puerto Rico 🇵🇷","US Virgin Islands 🇻🇮","British Virgin Islands 🇻🇬","Anguilla 🇦🇮","Montserrat 🇲🇸","Sint Maarten 🇸🇽","Other / Diaspora 🌍"];
  const iStyle = { width:"100%", padding:"13px 16px", borderRadius:12, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff", fontSize:14, outline:"none", boxSizing:"border-box", marginBottom:12 };
  const bg = { minHeight:"100vh", background:"linear-gradient(160deg,#0a1628 0%,#0d3320 60%,#0a1628 100%)", fontFamily:"'Georgia',serif", padding:"40px 28px" };

  if (mode === "splash") return (
    <div style={{ ...bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center", maxWidth:380, width:"100%" }}>
        <div style={{ fontSize:72, marginBottom:16 }}>🌴</div>
        <div style={{ fontSize:11, letterSpacing:5, color:"#4ade80", fontFamily:"monospace", marginBottom:12 }}>ISLAND IMPACT AI</div>
        <h1 style={{ color:"#fff", fontWeight:"normal", fontSize:30, margin:"0 0 10px", lineHeight:1.2 }}>Empowering Caribbean Communities</h1>
        <p style={{ color:"#86efac", fontSize:14, lineHeight:1.7, margin:"0 0 12px" }}>Resources · Finance · Payments — built for the Caribbean 🌊</p>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(6,182,212,0.1)", border:"1px solid rgba(6,182,212,0.3)", borderRadius:50, padding:"6px 16px", marginBottom:36 }}>
          <span>🌊</span><span style={{ fontSize:11, color:"#22d3ee", fontFamily:"monospace" }}>Includes Islandpact Pay</span>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <button onClick={() => setMode("signup")} style={{ width:"100%", padding:16, borderRadius:50, background:"linear-gradient(135deg,#4ade80,#22c55e)", border:"none", color:"#0a1628", fontWeight:"bold", fontSize:16, cursor:"pointer", boxShadow:"0 4px 20px rgba(74,222,128,0.3)" }}>Create Account 🌴</button>
          <button onClick={() => setMode("login")} style={{ width:"100%", padding:15, borderRadius:50, background:"transparent", border:"1px solid rgba(74,222,128,0.4)", color:"#4ade80", fontWeight:"bold", fontSize:15, cursor:"pointer" }}>Sign In</button>
          <button onClick={() => onAuth({ name:"Guest", island:"Caribbean", guest:true })} style={{ background:"none", border:"none", color:"#475569", fontSize:13, cursor:"pointer", padding:8, textDecoration:"underline" }}>Browse as Guest</button>
        </div>
        <div style={{ marginTop:36, display:"flex", justifyContent:"center", gap:28 }}>
          {[["🏝","Resources"],["💰","Finance"],["🌊","Payments"]].map(([icon,label]) => (
            <div key={label} style={{ textAlign:"center" }}><div style={{ fontSize:24 }}>{icon}</div><div style={{ fontSize:10, color:"#64748b", marginTop:4, fontFamily:"monospace" }}>{label}</div></div>
          ))}
        </div>
      </div>
    </div>
  );

  if (mode === "login") return (
    <div style={{ ...bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <div style={{ maxWidth:380, width:"100%" }}>
        <button onClick={() => setMode("splash")} style={{ background:"none", border:"none", color:"#64748b", cursor:"pointer", fontSize:13, marginBottom:24, padding:0 }}>← Back</button>
        <div style={{ fontSize:32, marginBottom:8 }}>👋🏾</div>
        <h2 style={{ color:"#fff", fontWeight:"normal", fontSize:26, margin:"0 0 6px" }}>Welcome back</h2>
        <p style={{ color:"#64748b", fontSize:14, margin:"0 0 28px" }}>Sign in to your Island Impact AI account</p>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" style={iStyle} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" style={iStyle} />
        <button style={{ textAlign:"right", background:"none", border:"none", color:"#4ade80", fontSize:13, cursor:"pointer", padding:"0 0 20px", display:"block", marginLeft:"auto" }}>Forgot password?</button>
        <button onClick={() => onAuth({ name:"Sandra", email, island:"Turks & Caicos 🇹🇨", guest:false })} style={{ width:"100%", padding:16, borderRadius:50, background:"linear-gradient(135deg,#4ade80,#22c55e)", border:"none", color:"#0a1628", fontWeight:"bold", fontSize:16, cursor:"pointer", marginBottom:20 }}>Sign In 🌴</button>
        <div style={{ textAlign:"center", color:"#64748b", fontSize:13 }}>Don't have an account? <span onClick={() => setMode("signup")} style={{ color:"#4ade80", cursor:"pointer" }}>Create one</span></div>
      </div>
    </div>
  );

  if (done) return (
    <div style={{ ...bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center" }}>
      <div style={{ fontSize:80, marginBottom:20 }}>🎉</div>
      <div style={{ fontSize:11, letterSpacing:4, color:"#4ade80", fontFamily:"monospace", marginBottom:12 }}>WELCOME TO THE FAMILY</div>
      <h2 style={{ color:"#fff", fontWeight:"normal", fontSize:28, margin:"0 0 12px" }}>You're in, {name}! 🌴</h2>
      <p style={{ color:"#86efac", fontSize:15, margin:"0 0 32px", lineHeight:1.7 }}>Your Island Impact AI account is ready. Resources, Finance & Islandpact Pay — all yours.</p>
      <button onClick={() => onAuth({ name, email, island, guest:false })} style={{ padding:"16px 40px", borderRadius:50, background:"linear-gradient(135deg,#4ade80,#22c55e)", border:"none", color:"#0a1628", fontWeight:"bold", fontSize:16, cursor:"pointer" }}>Let's Go 🌊</button>
    </div>
  );

  return (
    <div style={{ ...bg }}>
      <div style={{ maxWidth:380, margin:"0 auto" }}>
        <button onClick={() => step === 1 ? setMode("splash") : setStep(step - 1)} style={{ background:"none", border:"none", color:"#64748b", cursor:"pointer", fontSize:13, marginBottom:24, padding:0 }}>← Back</button>
        <div style={{ display:"flex", gap:6, marginBottom:32 }}>
          {[1,2,3].map(s => <div key={s} style={{ flex:1, height:3, borderRadius:2, background: s <= step ? "#4ade80" : "rgba(255,255,255,0.1)" }} />)}
        </div>

        {step === 1 && (<div>
          <div style={{ fontSize:32, marginBottom:8 }}>🌴</div>
          <h2 style={{ color:"#fff", fontWeight:"normal", fontSize:24, margin:"0 0 6px" }}>Create your account</h2>
          <p style={{ color:"#64748b", fontSize:14, margin:"0 0 28px" }}>Step 1 of 3 — Your details</p>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" style={iStyle} />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" style={iStyle} />
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" type="tel" style={iStyle} />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" type="password" style={iStyle} />
          <button onClick={() => name && email && setStep(2)} style={{ width:"100%", padding:15, borderRadius:50, background: name && email ? "linear-gradient(135deg,#4ade80,#22c55e)" : "rgba(74,222,128,0.2)", border:"none", color: name && email ? "#0a1628" : "#475569", fontWeight:"bold", fontSize:15, cursor: name && email ? "pointer" : "default" }}>Continue →</button>
        </div>)}

        {step === 2 && (<div>
          <div style={{ fontSize:32, marginBottom:8 }}>🏝</div>
          <h2 style={{ color:"#fff", fontWeight:"normal", fontSize:24, margin:"0 0 6px" }}>Where are you from?</h2>
          <p style={{ color:"#64748b", fontSize:14, margin:"0 0 16px" }}>Step 2 of 3 — Your island</p>
          <p style={{ color:"#86efac", fontSize:13, margin:"0 0 16px", lineHeight:1.6 }}>We'll show you resources and financial info specific to your island. 🌴</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8, maxHeight:300, overflowY:"auto", marginBottom:16 }}>
            {islandList.map(isl => (
              <div key={isl} onClick={() => setIsland(isl)} style={{ padding:"12px 16px", borderRadius:12, background: island === isl ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.04)", border:`1px solid ${island === isl ? "#4ade80" : "rgba(255,255,255,0.08)"}`, cursor:"pointer", color: island === isl ? "#4ade80" : "#e2e8f0", fontSize:14, fontWeight: island === isl ? "bold" : "normal" }}>{isl}</div>
            ))}
          </div>
          <button onClick={() => island && setStep(3)} style={{ width:"100%", padding:15, borderRadius:50, background: island ? "linear-gradient(135deg,#4ade80,#22c55e)" : "rgba(74,222,128,0.2)", border:"none", color: island ? "#0a1628" : "#475569", fontWeight:"bold", fontSize:15, cursor: island ? "pointer" : "default" }}>Continue →</button>
        </div>)}

        {step === 3 && (<div>
          <div style={{ fontSize:32, marginBottom:8 }}>🌊</div>
          <h2 style={{ color:"#fff", fontWeight:"normal", fontSize:24, margin:"0 0 6px" }}>Set up Islandpact Pay</h2>
          <p style={{ color:"#64748b", fontSize:14, margin:"0 0 20px" }}>Step 3 of 3 — Payments (optional)</p>
          <div style={{ background:"rgba(6,182,212,0.06)", border:"1px solid rgba(6,182,212,0.2)", borderRadius:16, padding:18, marginBottom:20 }}>
            <div style={{ color:"#22d3ee", fontWeight:"bold", fontSize:15, marginBottom:8 }}>🌊 What is Islandpact Pay?</div>
            <div style={{ color:"#94a3b8", fontSize:13, lineHeight:1.7 }}>Send money to family across the Caribbean — no Western Union, no big fees. Start Money Parties to raise funds as a community.</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
            {[["💸 Send money to family back home",true],["🎉 Create & contribute to Money Parties",true],["🏦 Caribbean-to-Caribbean transfers",false],["💳 Islandpact Pay debit card",false]].map(([f,a]) => (
              <div key={f} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderRadius:10, background:"rgba(255,255,255,0.04)" }}>
                <div>{a ? "✅" : "🔜"}</div><div style={{ color: a ? "#e2e8f0" : "#475569", fontSize:13 }}>{f}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setDone(true)} style={{ width:"100%", padding:16, borderRadius:50, background:"linear-gradient(135deg,#4ade80,#22c55e)", border:"none", color:"#0a1628", fontWeight:"bold", fontSize:16, cursor:"pointer", marginBottom:12 }}>Create My Account 🌴</button>
          <button onClick={() => setDone(true)} style={{ width:"100%", padding:14, borderRadius:50, background:"transparent", border:"1px solid rgba(255,255,255,0.1)", color:"#64748b", fontSize:14, cursor:"pointer" }}>Skip for now</button>
        </div>)}

        <div style={{ textAlign:"center", color:"#64748b", fontSize:12, marginTop:20 }}>Already have an account? <span onClick={() => setMode("login")} style={{ color:"#4ade80", cursor:"pointer" }}>Sign in</span></div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("resources");
  const [user, setUser] = useState<any>(null);
  const navItems = [["resources", "🏝", "Resources", "#4ade80"], ["pay", "🌊", "Islandpact Pay", "#22d3ee"], ["wealth", "💰", "Finance", "#fbbf24"]];

  if (!user) return <AuthScreen onAuth={setUser} />;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a1628 0%,#0d2818 50%,#0a1628 100%)", fontFamily: "'Georgia',serif", color: "#e8f5e9" }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.025, backgroundImage: "radial-gradient(circle at 2px 2px,#4ade80 1px,transparent 0)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div style={{ background: "rgba(10,22,40,0.97)", borderBottom: "1px solid rgba(74,222,128,0.12)", padding: "12px 24px", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><div style={{ fontSize: 13, fontWeight: "bold", color: "#4ade80", fontFamily: "monospace" }}>🌴 Island Impact AI</div><div style={{ fontSize: 10, color: "#64748b", marginTop: 1 }}>{user.guest ? "Browsing as Guest" : `Welcome, ${user.name.split(" ")[0]}!`}</div></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)", borderRadius: 50, padding: "4px 10px" }}><span style={{ fontSize: 11 }}>🌊</span><span style={{ fontSize: 9, color: "#22d3ee", fontFamily: "monospace", fontWeight: "bold" }}>ISLANDPACT PAY</span></div>
            {!user.guest && <div onClick={() => setUser(null)} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 13 }}>👤</div>}
          </div>
        </div>
      </div>
      {screen === "resources" && (<div style={{ padding: "18px 24px 4px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}><h2 style={{ color: "#fff", fontWeight: "normal", fontSize: 22, margin: "0 0 4px" }}>Caribbean Resource Directory</h2><p style={{ color: "#86efac", fontSize: 13, margin: 0 }}>Housing · Health · Business · Education · Emergency Aid</p></div>)}
      {screen === "resources" && <ResourceScreen />}
      {screen === "pay" && <IslandpactPayScreen />}
      {screen === "wealth" && <WealthScreen />}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(10,22,40,0.97)", borderTop: "1px solid rgba(74,222,128,0.15)", display: "flex", backdropFilter: "blur(10px)", zIndex: 99 }}>
        {navItems.map(([key, icon, label, color]) => (<button key={key} onClick={() => setScreen(key)} style={{ flex: 1, padding: "11px 8px 9px", background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}><div style={{ fontSize: 20 }}>{icon}</div><div style={{ fontSize: 9, color: screen === key ? color : "#475569", fontWeight: screen === key ? "bold" : "normal", fontFamily: "monospace" }}>{label}</div>{screen === key && <div style={{ width: 16, height: 2, borderRadius: 2, background: color }} />}</button>))}
      </div>
    </div>
  );
}
