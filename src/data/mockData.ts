import { Product, Category, Brand, ServiceItem, Mechanic, Order, ServiceRequest } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-brakes',
    name: 'Brake Systems',
    icon: 'Disc',
    description: 'Brake pads, ventilated rotors, performance calipers, and hydraulic fluid',
    itemCount: 42
  },
  {
    id: 'cat-engine',
    name: 'Engine & Powertrain',
    icon: 'Cpu',
    description: 'Spark plugs, timing belts, fuel injectors, gaskets, and filters',
    itemCount: 88
  },
  {
    id: 'cat-suspension',
    name: 'Suspension & Steering',
    icon: 'GitCommit',
    description: 'Shock absorbers, strut assemblies, control arms, and stabilizer links',
    itemCount: 56
  },
  {
    id: 'cat-oil',
    name: 'Oils & Fluids',
    icon: 'Droplet',
    description: 'Full-synthetic engine oils, transmission fluids, and radiator coolants',
    itemCount: 34
  },
  {
    id: 'cat-electrical',
    name: 'Electrical & Lighting',
    icon: 'Zap',
    description: 'High-intensity LED headlamps, alternators, starters, and heavy-duty batteries',
    itemCount: 65
  },
  {
    id: 'cat-transmission',
    name: 'Transmission & Clutch',
    icon: 'Settings',
    description: 'Clutch plate sets, flywheel kits, CV joint axles, and gear assemblies',
    itemCount: 29
  },
  {
    id: 'cat-exhaust',
    name: 'Exhaust & Intake',
    icon: 'Wind',
    description: 'Cold air intakes, performance mufflers, O2 oxygen sensors, and catalytic converters',
    itemCount: 24
  },
  {
    id: 'cat-wheels',
    name: 'Tires & Wheels',
    icon: 'CircleDot',
    description: 'All-terrain performance tires, forged alloys, valves, and TPMS sensors',
    itemCount: 38
  }
];

export const INITIAL_BRANDS: Brand[] = [
  {
    id: 'br-bosch',
    name: 'Bosch',
    logo: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=300&q=80',
    origin: 'Germany',
    description: 'Global benchmark for precision automotive electronics, braking systems, and filters.',
    partsCount: 142
  },
  {
    id: 'br-brembo',
    name: 'Brembo',
    logo: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=300&q=80',
    origin: 'Italy',
    description: 'World-renowned high performance disc brakes, calipers, and racing pads.',
    partsCount: 78
  },
  {
    id: 'br-mobil',
    name: 'Mobil 1',
    logo: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=300&q=80',
    origin: 'USA',
    description: 'Advanced full-synthetic motor oils trusted by Formula 1 and OEM manufacturers.',
    partsCount: 35
  },
  {
    id: 'br-ngk',
    name: 'NGK Spark Plugs',
    logo: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=300&q=80',
    origin: 'Japan',
    description: 'The world leader in OEM spark plugs and sensor ignition technologies.',
    partsCount: 64
  },
  {
    id: 'br-denso',
    name: 'Denso',
    logo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80',
    origin: 'Japan',
    description: 'Top-tier automotive climate control, starters, alternators, and ignition coils.',
    partsCount: 92
  },
  {
    id: 'br-castrol',
    name: 'Castrol',
    logo: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=300&q=80',
    origin: 'United Kingdom',
    description: 'Liquid engineering lubricants for supreme engine longevity and smooth shifting.',
    partsCount: 46
  },
  {
    id: 'br-kn',
    name: 'K&N Engineering',
    logo: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=300&q=80',
    origin: 'USA',
    description: 'High-flow washable performance air filters and oil filters for maximum horsepower.',
    partsCount: 41
  },
  {
    id: 'br-monroe',
    name: 'Monroe',
    logo: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80',
    origin: 'USA',
    description: 'Pioneers in vehicle ride control, shock absorbers, and suspension struts.',
    partsCount: 53
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Brembo Ceramic Premium Front Brake Pads Set',
    brand: 'Brembo',
    brandId: 'br-brembo',
    category: 'Brake Systems',
    categoryId: 'cat-brakes',
    partNumber: 'BRM-P85020N',
    price: 3450,
    originalPrice: 4200,
    stock: 18,
    rating: 4.9,
    reviewsCount: 124,
    image: 'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=800&q=80',
    description: 'High-durability ceramic compound formula for silent stopping, minimal brake dust, and extreme thermal resilience. Direct OEM replacement specification.',
    compatibleModels: ['Honda Civic (2016-2023)', 'Honda City (2018-2024)', 'Toyota Corolla (2015-2022)', 'Hyundai Elantra (2017-2023)'],
    specifications: {
      'Position': 'Front Axle',
      'Material': 'Ceramic Composite Friction Compound',
      'Wear Warning': 'Acoustic Wear Sensor Included',
      'Thickness': '17.2 mm',
      'Warranty': '2 Years / 40,000 km'
    },
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'prod-002',
    name: 'Bosch Platinum-Iridium Spark Plug (Pack of 4)',
    brand: 'Bosch',
    brandId: 'br-bosch',
    category: 'Engine & Powertrain',
    categoryId: 'cat-engine',
    partNumber: 'BOS-0242236564',
    price: 1890,
    originalPrice: 2400,
    stock: 45,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered with ultra-fine 360° laser-welded iridium electrode center and platinum ground for superior cold-start efficiency and fuel economy.',
    compatibleModels: ['Toyota Corolla (2014-2023)', 'Hyundai Creta (2016-2024)', 'Maruti Swift / Baleno (2017-2024)', 'Honda City (2015-2023)'],
    specifications: {
      'Electrode': 'Fine Wire Iridium & Platinum Pin',
      'Thread Size': '14 mm',
      'Hex Size': '16 mm',
      'Gap': '1.1 mm (Pre-gapped)',
      'Service Life': '100,000 km'
    },
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'prod-003',
    name: 'Mobil 1 ESP Advanced Full Synthetic 5W-30 Motor Oil (4 Liters)',
    brand: 'Mobil 1',
    brandId: 'br-mobil',
    category: 'Oils & Fluids',
    categoryId: 'cat-oil',
    partNumber: 'MOB-ESP-5W30-4L',
    price: 3850,
    originalPrice: 4600,
    stock: 26,
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80',
    description: 'Expert formulation designed to help prolong life and maintain efficiency of Emission Reduction Systems in both diesel and gasoline powered automobiles.',
    compatibleModels: ['Universal Gasoline & Light Diesel Engines', 'Volkswagen Polo / Vento', 'Skoda Rapid / Slavia', 'BMW 3-Series', 'Audi A4'],
    specifications: {
      'Viscosity': '5W-30',
      'Base Type': '100% PAO Synthetic Base',
      'Certifications': 'API SP / SN PLUS, ACEA C3, MB-Approval 229.51',
      'Volume': '4.0 Liters',
      'Thermal Stability': '-40°C to +240°C'
    },
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'prod-004',
    name: 'Monroe OESpectrum Front Strut & Shock Absorber Assembly',
    brand: 'Monroe',
    brandId: 'br-monroe',
    category: 'Suspension & Steering',
    categoryId: 'cat-suspension',
    partNumber: 'MNR-72439',
    price: 4950,
    originalPrice: 5800,
    stock: 12,
    rating: 4.7,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    description: 'Features Twin Technology Active Control System with internal rebound spring to smooth out road vibrations and give precise steering handling.',
    compatibleModels: ['Honda City (2014-2022)', 'Hyundai Verna (2016-2023)', 'Maruti Ciaz (2015-2023)', 'Toyota Yaris (2018-2023)'],
    specifications: {
      'Design': 'Gas-Charged Nitrogen Monotube Strut',
      'Position': 'Front Left / Right Pair Available',
      'Damping': 'Self-Adjusting Velocity Sensitive Valving',
      'Warranty': '3 Years / 50,000 km'
    },
    isFeatured: false,
    isBestSeller: false
  },
  {
    id: 'prod-005',
    name: 'Denso High-Output 12V 100A Alternator',
    brand: 'Denso',
    brandId: 'br-denso',
    category: 'Electrical & Lighting',
    categoryId: 'cat-electrical',
    partNumber: 'DNS-210-0648',
    price: 8400,
    originalPrice: 9900,
    stock: 8,
    rating: 4.8,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    description: 'OE precision high-amperage alternator providing stable current output even under high electrical accessory loads. Tested to rigorous thermal tolerances.',
    compatibleModels: ['Toyota Corolla Altis (2014-2021)', 'Toyota Innova Crysta (2016-2024)', 'Toyota Fortuner (2015-2023)'],
    specifications: {
      'Voltage': '12 Volts',
      'Current Output': '100 Amperes',
      'Pulley Type': '6-Groove Decoupler Pulley',
      'Rotation': 'Clockwise (CW)',
      'Certification': 'ISO/TS 16949 OE Spec'
    },
    isFeatured: true,
    isBestSeller: false
  },
  {
    id: 'prod-006',
    name: 'K&N High-Flow Washable Lifetime Engine Air Filter',
    brand: 'K&N Engineering',
    brandId: 'br-kn',
    category: 'Exhaust & Intake',
    categoryId: 'cat-exhaust',
    partNumber: 'KN-33-3005',
    price: 5200,
    originalPrice: 6100,
    stock: 22,
    rating: 4.9,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered to increase horsepower and acceleration with up to 50% more airflow compared to restrictive disposable paper filters. Washable and reusable.',
    compatibleModels: ['Volkswagen Polo 1.0/1.2 TSI', 'Volkswagen Vento', 'Skoda Rapid', 'Hyundai i20 / N-Line (2018-2024)'],
    specifications: {
      'Filter Material': 'Multi-Layer Oiled Cotton Gauze',
      'Shape': 'Panel Drop-in OE Airbox Replacement',
      'Cleaning Interval': 'Clean every 75,000 km under normal highway driving',
      'Warranty': '10-Year / 1,000,000 Mile Limited Warranty'
    },
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'prod-007',
    name: 'Brembo UV Coated Vented Front Brake Rotors (Pair)',
    brand: 'Brembo',
    brandId: 'br-brembo',
    category: 'Brake Systems',
    categoryId: 'cat-brakes',
    partNumber: 'BRM-09.B337.21',
    price: 7600,
    originalPrice: 8900,
    stock: 14,
    rating: 4.9,
    reviewsCount: 82,
    image: 'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=800&q=80',
    description: 'Direct cast iron rotors protected by exclusive environmentally-friendly water-based UV coating for superior anti-corrosion and clean rim appearance.',
    compatibleModels: ['Honda Civic (2017-2023)', 'Hyundai Creta (2018-2024)', 'Kia Seltos (2019-2024)', 'Toyota Corolla (2016-2022)'],
    specifications: {
      'Diameter': '280 mm',
      'Type': 'Internally Vented Disc',
      'Coating': 'UV-Cured Anti-Rust Protective Lacquer',
      'Bolt Holes': '5 Holes',
      'Tolerance': 'Precision balanced to < 15 microns'
    },
    isFeatured: false,
    isBestSeller: true
  },
  {
    id: 'prod-008',
    name: 'Bosch Gigawatt Maintenance-Free Heavy-Duty 12V 65Ah Car Battery',
    brand: 'Bosch',
    brandId: 'br-bosch',
    category: 'Electrical & Lighting',
    categoryId: 'cat-electrical',
    partNumber: 'BOS-S4-005',
    price: 6800,
    originalPrice: 7900,
    stock: 9,
    rating: 4.7,
    reviewsCount: 141,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    description: 'Silver alloy expanded grid technology delivers 15% more cold cranking power and 20% longer shelf life in tropical high heat weather.',
    compatibleModels: ['Hyundai Creta / Alcazar', 'Kia Seltos / Carens', 'Tata Harrier / Safari', 'Mahindra XUV700 / Scorpio-N'],
    specifications: {
      'Capacity': '65 Ah',
      'Cold Cranking Amps (CCA)': '540 A',
      'Terminal': 'Standard Left/Right Post',
      'Warranty': '36 Months Replacement Guarantee'
    },
    isFeatured: true,
    isBestSeller: false
  },
  {
    id: 'prod-009',
    name: 'Castrol Transmax Full Synthetic ATF Transmission Fluid (1L)',
    brand: 'Castrol',
    brandId: 'br-castrol',
    category: 'Transmission & Clutch',
    categoryId: 'cat-transmission',
    partNumber: 'CAS-TRX-ATF-1L',
    price: 890,
    originalPrice: 1050,
    stock: 38,
    rating: 4.6,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80',
    description: 'Enhanced friction durability formula ensures ultra-smooth clutch engagement and prevents gear shudder under heavy load acceleration.',
    compatibleModels: ['All Japanese & European 6-8 Speed Automatic Transmissions', 'Honda CVT/AT', 'Toyota WS ATF', 'Hyundai SP-IV'],
    specifications: {
      'Volume': '1.0 Liter',
      'Formulation': 'Smooth Drive Full Synthetic Technology',
      'Approval': 'JASO 1A, Dexron VI, Mercon LV'
    },
    isFeatured: false,
    isBestSeller: false
  },
  {
    id: 'prod-010',
    name: 'Valeo Full Clutch Plate & Pressure Plate Kit with Release Bearing',
    brand: 'Valeo',
    brandId: 'br-bosch',
    category: 'Transmission & Clutch',
    categoryId: 'cat-transmission',
    partNumber: 'VAL-826315',
    price: 6400,
    originalPrice: 7500,
    stock: 11,
    rating: 4.8,
    reviewsCount: 44,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    description: 'Complete 3-piece clutch replacement assembly with ergonomic diaphragm spring design for effortless clutch pedal travel and zero slip.',
    compatibleModels: ['Maruti Suzuki Swift Diesel / Petrol (2012-2022)', 'Maruti Dzire', 'Maruti Ertiga', 'Maruti Baleno'],
    specifications: {
      'Disc Diameter': '200 mm',
      'Spline Count': '18 Splines',
      'Bearing': 'Self-centering Hydraulic Release Included',
      'Warranty': '1 Year / 20,000 km'
    },
    isFeatured: false,
    isBestSeller: false
  },
  {
    id: 'prod-011',
    name: 'Philips Ultinon Pro9000 H7 LED Headlight Bulbs (+250% Lumens)',
    brand: 'Philips',
    brandId: 'br-bosch',
    category: 'Electrical & Lighting',
    categoryId: 'cat-electrical',
    partNumber: 'PHL-11972U90CWX2',
    price: 4990,
    originalPrice: 6200,
    stock: 25,
    rating: 4.9,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    description: 'Automotive Lumileds TopContact LEDs casting crisp 5800K white beam with precise cutoff line. Zero glare to oncoming drivers with AirBoost thermal architecture.',
    compatibleModels: ['Universal H7 Projector / Reflector Headlights', 'Hyundai Creta', 'Volkswagen Polo', 'Honda City', 'Tata Nexon'],
    specifications: {
      'Socket Type': 'H7',
      'Color Temperature': '5800 Kelvin Pure Daylight',
      'Lifespan': '5,000 Hours',
      'Voltage': '12V / 24V compatible',
      'IP Rating': 'IP65 Waterproof & Dustproof'
    },
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'prod-012',
    name: 'NGK Laser Iridium Long-Reach Spark Plug Set (SILZKBR8D8S)',
    brand: 'NGK Spark Plugs',
    brandId: 'br-ngk',
    category: 'Engine & Powertrain',
    categoryId: 'cat-engine',
    partNumber: 'NGK-97506',
    price: 3600,
    originalPrice: 4200,
    stock: 31,
    rating: 4.9,
    reviewsCount: 93,
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
    description: 'Precision laser-welded fine iridium tip with platinum disk back for turbo-charged direct-injection sports and luxury vehicles.',
    compatibleModels: ['BMW 3-Series (320i, 330i)', 'BMW 5-Series', 'Mini Cooper S', 'Audi A4 2.0 TFSI'],
    specifications: {
      'Heat Range': '8 (Cold Step 1)',
      'Thread Diameter': '12 mm',
      'Reach': '26.5 mm',
      'Hex Size': '14 mm Bi-Hex'
    },
    isFeatured: false,
    isBestSeller: false
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-01',
    name: 'Comprehensive Periodic Car Maintenance',
    category: 'Periodic Service',
    price: 2499,
    duration: '2.5 Hours',
    description: 'Complete bumper-to-bumper 65-point inspection, oil & filter change, brake cleaning, coolant top-up, and electrical checks.',
    icon: 'Wrench',
    includes: [
      'Engine Oil replacement (Synthetic)',
      'Oil Filter replacement',
      'Air & Cabin AC filter cleaning / check',
      '4-Wheel Brake pad inspection & cleaning',
      'Coolant & Brake fluid level top-up',
      'Battery voltage & specific gravity test',
      'Underbody & suspension inspection'
    ],
    recommendedInterval: 'Every 10,000 km or 6 Months'
  },
  {
    id: 'srv-02',
    name: 'Computerized Engine Diagnostics & ECU Scan',
    category: 'Diagnostics',
    price: 1199,
    duration: '45 Mins',
    description: 'Full OBD-II sensor diagnostics, check-engine light code scan, live sensor readings, misfire detection, and ECU health report.',
    icon: 'Cpu',
    includes: [
      'Complete OBD-II Diagnostic Scan',
      'Check Engine Light fault code reset & report',
      'Throttle response & O2 sensor analysis',
      'Ignition timing & injector pulse evaluation',
      'Detailed printed/digital diagnostic report'
    ],
    recommendedInterval: 'When warning light appears or annual check'
  },
  {
    id: 'srv-03',
    name: 'High-Performance Brake System Overhaul',
    category: 'Braking',
    price: 1799,
    duration: '1.5 Hours',
    description: 'Thorough caliper servicing, rotor thickness measurement, pad wear analysis, brake bleeding, and DOT4 fluid replacement.',
    icon: 'Disc',
    includes: [
      'Front & Rear brake pad caliper dismantling',
      'Caliper pin high-temp silicone lubrication',
      'Brake rotor runout and thickness micrometer check',
      'Brake fluid flush with DOT4 racing fluid',
      'Emergency handbrake cable adjustment'
    ],
    recommendedInterval: 'Every 20,000 km'
  },
  {
    id: 'srv-04',
    name: 'Car AC Disinfection, Leak Test & Gas Refill',
    category: 'Climate Control',
    price: 1899,
    duration: '1 Hour',
    description: 'AC cooling coil ultrasonic disinfection, condenser pressure check, filter replacement, and precision R134a refrigerant charge.',
    icon: 'Wind',
    includes: [
      'AC Condenser high-pressure foam cleaning',
      'Evaporator core antibacterial chemical fumigation',
      'Vacuum leak test on high/low pressure lines',
      'R134a pure refrigerant gas replenishment',
      'Compressor PAG lubricant oil top-up'
    ],
    recommendedInterval: 'Before Summer or every 12 Months'
  },
  {
    id: 'srv-05',
    name: '3D Laser Wheel Alignment & Dynamic Wheel Balancing',
    category: 'Tires & Wheels',
    price: 999,
    duration: '50 Mins',
    description: 'Precision digital computerized 4-wheel camber, caster, toe laser alignment and dynamic high-speed wheel balancing.',
    icon: 'CircleDot',
    includes: [
      'Digital 3D Laser sensor calibration',
      'Camber, Caster & Toe geometry adjustments',
      'All 4 wheels dynamic spin balancing on digital balancer',
      'Zinc adhesive wheel weight balancing',
      'Tire tread wear analysis & rotation'
    ],
    recommendedInterval: 'Every 5,000 to 7,000 km'
  },
  {
    id: 'srv-06',
    name: 'Battery Health Analysis & Express Replacement',
    category: 'Electrical',
    price: 499,
    duration: '30 Mins',
    description: 'Digital cold cranking amps (CCA) test, alternator load test, terminal de-oxidation, and doorstep quick battery installation.',
    icon: 'Zap',
    includes: [
      'Digital battery impedance & CCA load test',
      'Alternator charging diode & voltage check',
      'Starter motor cranking current draw test',
      'Terminal post cleaning & anti-sulfation gel application'
    ],
    recommendedInterval: 'Every 6 Months'
  }
];

export const INITIAL_MECHANICS: Mechanic[] = [
  {
    id: 'mech-01',
    name: 'Rajesh Kumar',
    contact: '+91 98451 22340',
    email: 'rajesh.mech@apesw.in',
    specialty: 'Master Engine & Powertrain Specialist',
    experienceYears: 12,
    rating: 4.9,
    status: 'active',
    currentJobsCount: 2,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'mech-02',
    name: 'Vikram Sharma',
    contact: '+91 98862 33411',
    email: 'vikram.brakes@apesw.in',
    specialty: 'Braking Systems & Suspension Pro',
    experienceYears: 8,
    rating: 4.8,
    status: 'active',
    currentJobsCount: 1,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'mech-03',
    name: 'Arun Nair',
    contact: '+91 97410 44522',
    email: 'arun.electric@apesw.in',
    specialty: 'Auto Electricals, ECU & Hybrid Systems',
    experienceYears: 10,
    rating: 4.9,
    status: 'active',
    currentJobsCount: 1,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'mech-04',
    name: 'Mohammed Farooq',
    contact: '+91 99001 55633',
    email: 'farooq.service@apesw.in',
    specialty: 'Periodic Maintenance & HVAC/AC Expert',
    experienceYears: 9,
    rating: 4.7,
    status: 'active',
    currentJobsCount: 0,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-84920',
    customerName: 'Sree Harish P K',
    customerEmail: 'sreeharish.pk@apesw.edu.in',
    customerPhone: '+91 98450 12345',
    shippingAddress: '42, Hennur Main Road, Kalyan Nagar',
    city: 'Bangalore',
    postalCode: '560043',
    items: [
      {
        productId: 'prod-001',
        productName: 'Brembo Ceramic Premium Front Brake Pads Set',
        brand: 'Brembo',
        price: 3450,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'prod-002',
        productName: 'Bosch Platinum-Iridium Spark Plug (Pack of 4)',
        brand: 'Bosch',
        price: 1890,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 5340,
    discount: 534,
    shippingFee: 0,
    totalAmount: 4806,
    paymentMethod: 'UPI / QR',
    paymentStatus: 'Paid',
    status: 'Out for Delivery',
    dateCreated: '2026-10-11 11:24 AM',
    estimatedDelivery: 'Today by 5:00 PM',
    trackingNumber: 'TRK-IND-902482',
    courierName: 'Apex Express Logistics'
  },
  {
    id: 'ORD-72914',
    customerName: 'Varun K S',
    customerEmail: 'varun.ks@apesw.edu.in',
    customerPhone: '+91 97412 88990',
    shippingAddress: '15/B, Outer Ring Road, Hebbal',
    city: 'Bangalore',
    postalCode: '560024',
    items: [
      {
        productId: 'prod-003',
        productName: 'Mobil 1 ESP Advanced Full Synthetic 5W-30 Motor Oil (4 Liters)',
        brand: 'Mobil 1',
        price: 3850,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 7700,
    discount: 0,
    shippingFee: 0,
    totalAmount: 7700,
    paymentMethod: 'Credit/Debit Card',
    paymentStatus: 'Paid',
    status: 'Delivered',
    dateCreated: '2026-10-08 03:15 PM',
    estimatedDelivery: 'Delivered on Oct 10, 2026',
    trackingNumber: 'TRK-IND-881203',
    courierName: 'BlueDart Express'
  },
  {
    id: 'ORD-65103',
    customerName: 'Venkat Bhanu Prasad',
    customerEmail: 'venkat.bhanu@apesw.edu.in',
    customerPhone: '+91 99008 34125',
    shippingAddress: '88, Kammanahalli Main Road',
    city: 'Bangalore',
    postalCode: '560084',
    items: [
      {
        productId: 'prod-006',
        productName: 'K&N High-Flow Washable Lifetime Engine Air Filter',
        brand: 'K&N Engineering',
        price: 5200,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 5200,
    discount: 520,
    shippingFee: 0,
    totalAmount: 4680,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    status: 'Packed',
    dateCreated: '2026-10-12 09:40 AM',
    estimatedDelivery: 'Oct 14, 2026',
    trackingNumber: 'TRK-IND-773419',
    courierName: 'Apex Express Logistics'
  }
];

export const INITIAL_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: 'SRV-401',
    serviceId: 'srv-01',
    serviceName: 'Comprehensive Periodic Car Maintenance',
    servicePrice: 2499,
    customerName: 'Sree Harish P K',
    customerPhone: '+91 98450 12345',
    customerEmail: 'sreeharish.pk@apesw.edu.in',
    vehicleMake: 'Honda',
    vehicleModel: 'Civic V-TEC',
    vehicleYear: '2021',
    vehicleRegNo: 'KA-03-MK-7182',
    fuelType: 'Petrol',
    serviceType: 'Doorstep Mobile Mechanic',
    address: '42, Hennur Main Road, Kalyan Nagar, Bangalore',
    scheduledDate: '2026-10-14',
    scheduledTimeSlot: '10:00 AM - 12:30 PM',
    notes: 'Please check slight squeaking sound on rear brakes during cold mornings.',
    mechanicId: 'mech-01',
    mechanicName: 'Rajesh Kumar (Engine Specialist)',
    status: 'Assigned',
    dateCreated: '2026-10-12 04:30 PM'
  },
  {
    id: 'SRV-402',
    serviceId: 'srv-02',
    serviceName: 'Computerized Engine Diagnostics & ECU Scan',
    servicePrice: 1199,
    customerName: 'Varun K S',
    customerPhone: '+91 97412 88990',
    customerEmail: 'varun.ks@apesw.edu.in',
    vehicleMake: 'Hyundai',
    vehicleModel: 'Creta 1.4 Turbo',
    vehicleYear: '2022',
    vehicleRegNo: 'KA-04-NA-9021',
    fuelType: 'Petrol',
    serviceType: 'Workshop Drop-off',
    scheduledDate: '2026-10-15',
    scheduledTimeSlot: '02:00 PM - 03:00 PM',
    notes: 'Check engine indicator flashed intermittently yesterday on highway.',
    mechanicId: 'mech-03',
    mechanicName: 'Arun Nair (ECU Specialist)',
    status: 'In Progress',
    dateCreated: '2026-10-11 02:15 PM'
  }
];

export const VEHICLE_DATABASE = {
  makes: ['Honda', 'Toyota', 'Hyundai', 'Maruti Suzuki', 'Volkswagen', 'Skoda', 'BMW', 'Tata', 'Mahindra', 'Ford'],
  modelsByMake: {
    'Honda': ['City', 'Civic', 'Amaze', 'Elevate', 'CR-V', 'Accord'],
    'Toyota': ['Corolla Altis', 'Innova Crysta', 'Fortuner', 'Urban Cruiser Hyryder', 'Glanza', 'Camry'],
    'Hyundai': ['Creta', 'i20', 'Verna', 'Venue', 'Tucson', 'Alcazar'],
    'Maruti Suzuki': ['Swift', 'Baleno', 'Brezza', 'Dzire', 'Ertiga', 'Grand Vitara', 'Ciaz'],
    'Volkswagen': ['Polo', 'Vento', 'Taigun', 'Virtus', 'Tiguan'],
    'Skoda': ['Rapid', 'Slavia', 'Kushaq', 'Octavia', 'Superb'],
    'BMW': ['3-Series (G20/F30)', '5-Series (G30)', 'X1', 'X3', 'X5'],
    'Tata': ['Nexon', 'Harrier', 'Safari', 'Altroz', 'Punch', 'Tiago'],
    'Mahindra': ['XUV700', 'Scorpio-N', 'Thar', 'XUV300', 'Bolero'],
    'Ford': ['EcoSport', 'Endeavour', 'Figo', 'Aspire']
  } as Record<string, string[]>,
  years: ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012']
};

export const PROJECT_REPORT_METADATA = {
  title: 'AUTO PARTS ECOMMERCE SELLING WEBSITE (APESW)',
  course: 'VI Semester Bachelor of Computer Applications (BCA)',
  institution: 'Indian Academy Degree College - Autonomous, Bangalore',
  academicYear: '2024 - 2025',
  students: [
    { name: 'Sree Harish. P K', regNo: '22IABCA071', role: 'Full Stack Architecture & DB Lead' },
    { name: 'Varun K S', regNo: '22IABCA080', role: 'Frontend & UI/UX Developer' },
    { name: 'Venkat Bhanu Prasad', regNo: '22IABCA083', role: 'Backend API & QA Testing Lead' }
  ],
  internalGuide: 'Mrs. Parvathy. J',
  headOfDepartment: 'Mrs. Anuradha P',
  principal: 'Dr. Bharathi. S',
  schemaTablesCount: 14,
  tablesList: [
    { name: 'tblbrand_list', purpose: 'Stores registered automotive parts brands (Bosch, Brembo, etc.)' },
    { name: 'tblcart_list', purpose: 'Stores active client shopping cart items' },
    { name: 'tblcategories', purpose: 'Hierarchical product classifications (Engine, Brakes, Transmission, etc.)' },
    { name: 'tblclient_list', purpose: 'Registered customer profiles and addresses' },
    { name: 'tblmechanic_list', purpose: 'Certified mechanics roster, phone contacts and active status' },
    { name: 'tblorder_items', purpose: 'Itemized lines, quantities, and price per order' },
    { name: 'tblorder_list', purpose: 'Order status, delivery address, tracking ref, total amount' },
    { name: 'tblproduct_list', purpose: 'Auto parts catalog with SKU, brand ID, category ID, compatibility' },
    { name: 'tblrequest_meta', purpose: 'User request parameters and inquiry history' },
    { name: 'tblservice_list', purpose: 'Automotive maintenance services and cost breakdown' },
    { name: 'tblservice_request', purpose: 'Service bookings, vehicle details, assigned mechanic ID, live status' },
    { name: 'tblstock_list', purpose: 'Inventory quantity tracking and stock adjustments' },
    { name: 'tblsystem_info', purpose: 'Store branding, contact details, tax rate, and settings' },
    { name: 'tbluser_info', purpose: 'Admin and staff authentication credentials and permissions' }
  ]
};
