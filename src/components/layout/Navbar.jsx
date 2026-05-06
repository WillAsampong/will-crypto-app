import React, { useState, useEffect, useRef } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import coinbaseIcon from "../../assets/icons/coinbase-logo.svg";
import { FaBars, FaXmark, FaChevronRight } from 'react-icons/fa6';
import {
    IoCartOutline,
    IoGridOutline,
    IoShieldCheckmarkOutline,
    IoPersonOutline,
    IoBarChartOutline,
    IoStatsChartOutline,
    IoBusinessOutline,
    IoCardOutline,
    IoWalletOutline,
    IoBookOutline,
    IoListOutline,
    IoSettingsOutline,
    IoShieldOutline,
    IoLayersOutline,
    IoCubeOutline,
    IoSwapHorizontalOutline,
    IoFlashOutline,
    IoTrendingUpOutline,
    IoWaterOutline,
    IoInformationCircleOutline,
    IoBriefcaseOutline,
    IoPeopleOutline,
    IoHelpCircleOutline,
    IoNewspaperOutline,
    IoGlobeOutline,
    IoSearchOutline
} from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isIndividualsOpen, setIsIndividualsOpen] = useState(false);
    const [isMenuPinned, setIsMenuPinned] = useState(false);
    const [isBusinessOpen, setIsBusinessOpen] = useState(false);
    const [isBusinessPinned, setIsBusinessPinned] = useState(false);
    const [isInstitutionsOpen, setIsInstitutionsOpen] = useState(false);
    const [isInstitutionsPinned, setIsInstitutionsPinned] = useState(false);
    const [isDevelopersOpen, setIsDevelopersOpen] = useState(false);
    const [isDevelopersPinned, setIsDevelopersPinned] = useState(false);
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);
    const [isCompanyPinned, setIsCompanyPinned] = useState(false);
    const individualsRef = useRef(null);
    const businessRef = useRef(null);
    const institutionsRef = useRef(null);
    const developersRef = useRef(null);
    const companyRef = useRef(null);
    const languageRef = useRef(null);

    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSearchTab, setActiveSearchTab] = useState('Top');
    const [assets, setAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [languageSearch, setLanguageSearch] = useState('');
    const [selectedLang, setSelectedLang] = useState('en-global');

    const languages = [
        { id: 'en-global', name: 'English', region: 'Global' },
        { id: 'en-us', name: 'English', region: 'United States' },
        { id: 'es-es', name: 'Español', region: 'España' },
        { id: 'es-mx', name: 'Español', region: 'México' },
        { id: 'de-de', name: 'Deutsch', region: 'Deutschland' },
        { id: 'fr-fr', name: 'Français', region: 'France' },
        { id: 'it-it', name: 'Italiano', region: 'Italia' },
        { id: 'pt-br', name: 'Português', region: 'Brasil' },
        { id: 'ja-jp', name: '日本語', region: '日本' },
        { id: 'ko-kr', name: '한국어', region: '대한민국' },
        { id: 'zh-cn', name: '简体中文', region: '中国' },
    ];

    const filteredLanguages = languages.filter(lang =>
        lang.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
        lang.region.toLowerCase().includes(languageSearch.toLowerCase())
    );

    // Categories data for the mega-menu
    const categories = [
        {
            items: [
                { title: 'Buy and sell', desc: 'Buy, sell, and use crypto', icon: <IoCartOutline className="text-xl" /> },
                { title: 'Base App', desc: 'Post, earn, trade, and chat, all in one place', icon: <IoGridOutline className="text-xl" /> },
                { title: 'Coinbase One', desc: 'Get zero trading fees and more', icon: <IoShieldCheckmarkOutline className="text-xl" /> },
                { title: 'Private Client', desc: 'For clients, family offices, UHNWIs', icon: <IoPersonOutline className="text-xl" /> },
                { title: 'Onchain', desc: 'Dive into the world of onchain apps', icon: <IoGlobeOutline className="text-xl" /> },
                { title: 'Learn', desc: 'Crypto tips and guides', icon: <IoBookOutline className="text-xl" /> },
            ]
        },
        {
            items: [
                { title: 'Advanced', desc: 'Professional-grade trading tools', icon: <IoBarChartOutline className="text-xl" /> },
                { title: 'Earn', desc: 'Stake your crypto and earn rewards', icon: <IoStatsChartOutline className="text-xl" /> },
                { title: 'Coinbase Wealth', desc: 'Institutional-grade services for UHNW', icon: <IoBusinessOutline className="text-xl" /> },
                { title: 'Credit Card', desc: 'Earn up to 4% bitcoin back', icon: <IoCardOutline className="text-xl" /> },
                { title: 'Debit Card', desc: 'Spend crypto, get crypto back', icon: <IoWalletOutline className="text-xl" /> },
            ]
        }
    ];

    // Categories data for Business mega-menu
    const businessCategories = [
        {
            items: [
                { title: 'Business', desc: 'Crypto trading and payments for startups and SMBs', icon: <IoBusinessOutline className="text-xl" /> },
                { title: 'Payments', desc: 'The stablecoin payments stack for commerce platforms', icon: <IoWalletOutline className="text-xl" /> },
                { title: 'Commerce', desc: 'Start accepting crypto payments', icon: <IoCartOutline className="text-xl" /> },
            ]
        },
        {
            items: [
                { title: 'Asset Listings', desc: 'List your asset on Coinbase', icon: <IoListOutline className="text-xl" /> },
                { title: 'Token Manager', desc: 'The platform for token distributions, vesting, and lockups', icon: <IoSettingsOutline className="text-xl" /> },
            ]
        }
    ];

    // Categories data for Institutions mega-menu
    const institutionCategories = [
        {
            title: 'Prime',
            items: [
                { title: 'Trading and Financing', desc: 'Professional prime brokerage services', icon: <IoBarChartOutline className="text-xl" /> },
                { title: 'Custody', desc: 'Securely store all your digital assets', icon: <IoShieldOutline className="text-xl" /> },
                { title: 'Staking', desc: 'Explore staking across our products', icon: <IoLayersOutline className="text-xl" /> },
                { title: 'Onchain Wallet', desc: 'Institutional-grade wallet to get onchain', icon: <IoWalletOutline className="text-xl" /> },
            ]
        },
        {
            title: 'Markets',
            items: [
                { title: 'Exchange', desc: 'Spot markets for high-frequency trading', icon: <IoFlashOutline className="text-xl" /> },
                { title: 'International Exchange', desc: 'Access perpetual futures markets', icon: <IoGlobeOutline className="text-xl" /> },
                { title: 'Derivatives Exchange', desc: 'Trade an accessible futures market', icon: <IoTrendingUpOutline className="text-xl" /> },
                { title: 'Verified Pools', desc: 'Transparent, verified liquidity pools', icon: <IoWaterOutline className="text-xl" /> },
            ]
        }
    ];

    // Categories data for Developers mega-menu
    const developerCategories = [
        {
            title: 'Coinbase Developer Platform',
            items: [
                { title: 'Payments', desc: 'Fast and global stablecoin payments with a single integration', icon: <IoWalletOutline className="text-xl" /> },
                { title: 'Trading', desc: 'Launch crypto trading and custody for your users', icon: <IoBarChartOutline className="text-xl" /> },
                { title: 'Wallets', desc: 'Deploy customizable and scalable wallets for your business', icon: <IoGridOutline className="text-xl" /> },
                { title: 'Stablecoins', desc: 'Access USDC and Coinbase Custom Stablecoins', icon: <IoCubeOutline className="text-xl" /> },
            ]
        },
        {
            title: 'Solutions for any company',
            items: [
                { title: 'Banks & Brokerages', desc: 'Secure, regulated offerings for retail, private banking, & institutional clients', icon: <IoBusinessOutline className="text-xl" /> },
                { title: 'Payment Firms', desc: 'Near-instant, low-cost, global payment rails for modern providers', icon: <IoCardOutline className="text-xl" /> },
                { title: 'Startups', desc: 'Launch your business with the world\'s leader in crypto', icon: <IoFlashOutline className="text-xl" /> },
            ]
        }
    ];

    // Categories data for Company mega-menu
    const companyCategories = [
        {
            items: [
                { title: 'About', desc: 'Powering the crypto economy', icon: <IoInformationCircleOutline className="text-xl" /> },
                { title: 'Careers', desc: 'Work with us', icon: <IoBriefcaseOutline className="text-xl" /> },
                { title: 'Affiliates', desc: 'Help introduce the world to crypto', icon: <IoPeopleOutline className="text-xl" /> },
            ]
        },
        {
            items: [
                { title: 'Support', desc: 'Find answers to your questions', icon: <IoHelpCircleOutline className="text-xl" /> },
                { title: 'Blog', desc: 'Read the latest from Coinbase', icon: <IoNewspaperOutline className="text-xl" /> },
                { title: 'Security', desc: 'The most trusted & secure', icon: <IoShieldCheckmarkOutline className="text-xl" /> },
            ]
        }
    ];

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (individualsRef.current && !individualsRef.current.contains(event.target)) {
                setIsIndividualsOpen(false);
                setIsMenuPinned(false);
            }
            if (businessRef.current && !businessRef.current.contains(event.target)) {
                setIsBusinessOpen(false);
                setIsBusinessPinned(false);
            }
            if (institutionsRef.current && !institutionsRef.current.contains(event.target)) {
                setIsInstitutionsOpen(false);
                setIsInstitutionsPinned(false);
            }
            if (developersRef.current && !developersRef.current.contains(event.target)) {
                setIsDevelopersOpen(false);
                setIsDevelopersPinned(false);
            }
            if (companyRef.current && !companyRef.current.contains(event.target)) {
                setIsCompanyOpen(false);
                setIsCompanyPinned(false);
            }
            if (languageRef.current && !languageRef.current.contains(event.target)) {
                setIsLanguageModalOpen(false);
            }
            if (isSearchVisible && !event.target.closest('.search-container')) {
                setIsSearchVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSearchVisible]);

    // Fetch assets for search
    useEffect(() => {
        if (!isSearchVisible) return;

        const fetchAssets = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetching top 50 coins for a rich search experience
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
                );
                if (!response.ok) throw new Error('API limit reached. Please try again later.');
                const data = await response.json();

                // Map the data to our asset format
                const mappedAssets = data.map(coin => ({
                    id: coin.id,
                    name: coin.name,
                    symbol: coin.symbol.toUpperCase(),
                    icon: coin.image,
                    price: coin.current_price,
                    change: coin.price_change_percentage_24h,
                    marketCap: coin.market_cap,
                }));
                setAssets(mappedAssets);
            } catch (err) {
                console.error('Error fetching assets:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (assets.length === 0) {
            fetchAssets();
        }
    }, [isSearchVisible, assets.length]);

    // Filter assets based on search query and active tab
    const filteredAssets = assets.filter(asset => {
        const matchesQuery = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            asset.symbol.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesQuery) return false;

        switch (activeSearchTab) {
            case 'Top':
                return true; // Show all top assets
            case 'Crypto':
                return true; // CoinGecko assets are all crypto
            case 'Perpetuals':
            case 'Future':
                // Filter for major assets that usually have perpetuals/futures
                const derivativeSymbols = ['BTC', 'ETH', 'SOL', 'XRP', 'ADA', 'AVAX', 'LINK', 'DOT'];
                return derivativeSymbols.includes(asset.symbol);
            case 'Stocks':
                // Mocking stocks since we only have crypto data
                const stockSymbols = ['AAPL', 'TSLA', 'COIN', 'GOOGL', 'AMZN'];
                // This will return nothing for now unless we add mock stocks to the 'assets' state
                return false;
            case 'Predictions':
                // Mocking prediction markets
                return asset.name.includes('Election') || asset.name.includes('Rate');
            default:
                return true;
        }
    });

    // Add some mock stocks and predictions if those tabs are selected
    const displayAssets = [...filteredAssets];
    if (activeSearchTab === 'Stocks' && searchQuery.length > 0) {
        const stocks = [
            { id: 'apple', name: 'Apple Inc.', symbol: 'AAPL', icon: 'https://logo.clearbit.com/apple.com', price: 189.43, change: 1.2, isStock: true },
            { id: 'tesla', name: 'Tesla, Inc.', symbol: 'TSLA', icon: 'https://logo.clearbit.com/tesla.com', price: 175.34, change: -2.1, isStock: true },
            { id: 'coinbase', name: 'Coinbase Global', symbol: 'COIN', icon: 'https://logo.clearbit.com/coinbase.com', price: 242.12, change: 5.4, isStock: true },
        ].filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.symbol.toLowerCase().includes(searchQuery.toLowerCase()));
        displayAssets.push(...stocks);
    }
    if (activeSearchTab === 'Predictions' && searchQuery.length === 0) {
        displayAssets.push(
            { id: 'p1', name: 'US Presidential Election 2024', symbol: 'VOTE', icon: 'https://logo.clearbit.com/whitehouse.gov', price: 0.52, change: 0.1, isPrediction: true },
            { id: 'p2', name: 'Fed Interest Rate Hike in May', symbol: 'FED', icon: 'https://logo.clearbit.com/federalreserve.gov', price: 0.15, change: -5.0, isPrediction: true },
        );
    }

    const handleMouseEnter = () => setIsIndividualsOpen(true);
    const handleMouseLeave = () => {
        if (!isMenuPinned) setIsIndividualsOpen(false);
    };
    const handleClick = () => {
        const newState = !isMenuPinned;
        setIsMenuPinned(newState);
        setIsIndividualsOpen(newState);
    };

    const handleBusinessMouseEnter = () => setIsBusinessOpen(true);
    const handleBusinessMouseLeave = () => {
        if (!isBusinessPinned) setIsBusinessOpen(false);
    };
    const handleBusinessClick = () => {
        const newState = !isBusinessPinned;
        setIsBusinessPinned(newState);
        setIsBusinessOpen(newState);
    };

    const handleInstitutionsMouseEnter = () => setIsInstitutionsOpen(true);
    const handleInstitutionsMouseLeave = () => {
        if (!isInstitutionsPinned) setIsInstitutionsOpen(false);
    };
    const handleInstitutionsClick = () => {
        const newState = !isInstitutionsPinned;
        setIsInstitutionsPinned(newState);
        setIsInstitutionsOpen(newState);
    };

    const handleDevelopersMouseEnter = () => setIsDevelopersOpen(true);
    const handleDevelopersMouseLeave = () => {
        if (!isDevelopersPinned) setIsDevelopersOpen(false);
    };
    const handleDevelopersClick = () => {
        const newState = !isDevelopersPinned;
        setIsDevelopersPinned(newState);
        setIsDevelopersOpen(newState);
    };

    const handleCompanyMouseEnter = () => setIsCompanyOpen(true);
    const handleCompanyMouseLeave = () => {
        if (!isCompanyPinned) setIsCompanyOpen(false);
    };
    const handleCompanyClick = () => {
        const newState = !isCompanyPinned;
        setIsCompanyPinned(newState);
        setIsCompanyOpen(newState);
    };

    return (
        <header className="w-full h-20 bg-white border-b border-gray-100 sticky top-0 z-5000">
            {/* Background Scrim for Search Mode */}
            {isSearchVisible && (
                <div
                    className="fixed inset-0 bg-black/5 z-4000 animate-in fade-in duration-300"
                    onClick={() => setIsSearchVisible(false)}
                />
            )}
            <div className="max-w-7xl mx-auto h-full flex items-center justify-between pl-0 pr-4 md:pr-8">

                {/* 1. Logo and Nav */}
                <div className="flex items-center gap-3 h-full">
                    <Link to="/" className="flex items-center">
                        <img src={coinbaseIcon} alt="Coinbase" className="h-8 md:h-10" />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-2 text-black h-full">
                        <Link to="/explore" className="font-bold text-[16px] text-black hover:text-black transition-colors">Cryptocurrencies</Link>

                        {/* Individuals Mega-Menu Trigger */}
                        <div
                            className="h-full flex items-center relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            ref={individualsRef}
                        >
                            <button
                                onClick={handleClick}
                                className="font-bold text-[16px] text-black hover:text-black h-full flex items-center px-3 cursor-pointer outline-none border-none bg-transparent"
                            >
                                Individuals
                            </button>

                            {/* The Mega Menu - Full Width restored */}
                            {isIndividualsOpen && (
                                <div className="fixed top-20 left-0 w-full bg-white border-b border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.12)] py-12 px-8 flex justify-center z-6000">
                                    <div className="max-w-7xl w-full grid grid-cols-12 gap-10">

                                        {/* Left Side: 2 Columns of Links - Scrollable (Hidden Scrollbar) */}
                                        <div className="col-span-8 grid grid-cols-2 gap-x-12 gap-y-6 max-h-[50vh] overflow-y-auto pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                            {categories.map((col, idx) => (
                                                <div key={idx} className="flex flex-col gap-4">
                                                    {col.items.map((item, i) => (
                                                        <a key={i} href="#" className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                            <div className="mt-1 text-gray-400 group-hover:text-black transition-colors">
                                                                {item.icon}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-[17.5px] text-black transition-colors">{item.title}</span>
                                                                <span className="text-[15.5px] text-gray-500 font-medium leading-[1.3]">{item.desc}</span>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Right Side: Featured Promo Area - Compact Side-by-Side */}
                                        <div className="col-span-4 border-l border-gray-100 pl-10 flex items-start">
                                            <a href="#" className="flex items-start gap-8 group cursor-pointer hover:bg-gray-50 p-5 rounded-3xl transition-all duration-300 w-full">
                                                <div className="w-36 h-36 shrink-0">
                                                    <img
                                                        src={individualImg}
                                                        alt="Featured"
                                                        className="w-full h-full object-cover rounded-2xl"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5 pt-1 h-36 justify-between">
                                                    <div className="flex flex-col gap-1">
                                                        <h3 className="font-bold text-[20px] text-black transition-colors leading-tight">System Update</h3>
                                                        <p className="text-[15.5px] text-gray-500 font-medium leading-tight max-w-50">
                                                            The next chapter of Coinbase. <br />Live on X 12/17.
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[#0052ff] font-bold text-[14px] mt-auto">
                                                        Learn more <FaChevronRight className="text-[11px]" />
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Businesses Mega-Menu Trigger */}
                        <div
                            className="h-full flex items-center relative"
                            onMouseEnter={handleBusinessMouseEnter}
                            onMouseLeave={handleBusinessMouseLeave}
                            ref={businessRef}
                        >
                            <button
                                onClick={handleBusinessClick}
                                className="font-bold text-[16px] text-black hover:text-black h-full flex items-center px-3 cursor-pointer outline-none border-none bg-transparent"
                            >
                                Businesses
                            </button>

                            {/* The Business Mega Menu - Full Width */}
                            {isBusinessOpen && (
                                <div className="fixed top-20 left-0 w-full bg-white border-b border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.12)] py-12 px-8 flex justify-center z-6000">
                                    <div className="max-w-7xl w-full grid grid-cols-12 gap-10">

                                        {/* Left Side: 2 Columns of Links - Scrollable (Hidden Scrollbar) */}
                                        <div className="col-span-8 grid grid-cols-2 gap-x-12 gap-y-6 max-h-[50vh] overflow-y-auto pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                            {businessCategories.map((col, idx) => (
                                                <div key={idx} className="flex flex-col gap-4">
                                                    {col.items.map((item, i) => (
                                                        <a key={i} href="#" className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                            <div className="mt-1 text-gray-400 group-hover:text-black transition-colors">
                                                                {item.icon}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-[17.5px] text-black transition-colors">{item.title}</span>
                                                                <span className="text-[15.5px] text-gray-500 font-medium leading-[1.3]">{item.desc}</span>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Right Side: Featured Promo Area - Compact Side-by-Side */}
                                        <div className="col-span-4 border-l border-gray-100 pl-10 flex items-start">
                                            <a href="#" className="flex items-start gap-8 group cursor-pointer hover:bg-gray-50 p-5 rounded-3xl transition-all duration-300 w-full">
                                                <div className="w-36 h-36 shrink-0">
                                                    <img
                                                        src={businessImg}
                                                        alt="Featured"
                                                        className="w-full h-full object-cover rounded-2xl"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5 pt-1 h-36 justify-between">
                                                    <div className="flex flex-col gap-1">
                                                        <h3 className="font-bold text-[20px] text-black transition-colors leading-tight">Commerce Payments Protocol</h3>
                                                        <p className="text-[15.5px] text-gray-500 font-medium leading-tight max-w-50">
                                                            A new standard for onchain payments.
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[#0052ff] font-bold text-[14px] mt-auto">
                                                        Go to Payments <FaChevronRight className="text-[11px]" />
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Institutions Mega-Menu Trigger */}
                        <div
                            className="h-full flex items-center relative"
                            onMouseEnter={handleInstitutionsMouseEnter}
                            onMouseLeave={handleInstitutionsMouseLeave}
                            ref={institutionsRef}
                        >
                            <button
                                onClick={handleInstitutionsClick}
                                className="font-bold text-[16px] text-black hover:text-black h-full flex items-center px-3 cursor-pointer outline-none border-none bg-transparent"
                            >
                                Institutions
                            </button>

                            {/* The Institutions Mega Menu - Full Width */}
                            {isInstitutionsOpen && (
                                <div className="fixed top-20 left-0 w-full bg-white border-b border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.12)] py-12 px-8 flex justify-center z-6000">
                                    <div className="max-w-7xl w-full grid grid-cols-12 gap-10">

                                        {/* Left Side: 2 Columns of Links - Scrollable (Hidden Scrollbar) */}
                                        <div className="col-span-8 grid grid-cols-2 gap-x-12 gap-y-6 max-h-[50vh] overflow-y-auto pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                            {institutionCategories.map((col, idx) => (
                                                <div key={idx} className="flex flex-col gap-4">
                                                    <a href="#" className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors group/header w-fit">
                                                        <h4 className="text-black font-bold text-[15px] tracking-wide uppercase">{col.title}</h4>
                                                        {col.title === 'Prime' && (
                                                            <FaChevronRight className="text-[10px] text-gray-400 group-hover/header:text-black transition-colors mt-0.5" />
                                                        )}
                                                    </a>
                                                    {col.items.map((item, i) => (
                                                        <a key={i} href="#" className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                            <div className="mt-1 text-gray-400 group-hover:text-black transition-colors">
                                                                {item.icon}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-[17.5px] text-black transition-colors">{item.title}</span>
                                                                <span className="text-[15.5px] text-gray-500 font-medium leading-[1.3]">{item.desc}</span>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Right Side: Featured Promo Area - Compact Side-by-Side */}
                                        <div className="col-span-4 border-l border-gray-100 pl-10 flex items-start">
                                            <a href="#" className="flex items-start gap-8 group cursor-pointer hover:bg-gray-50 p-5 rounded-3xl transition-all duration-300 w-full">
                                                <div className="w-36 h-36 shrink-0">
                                                    <img
                                                        src={institutionImg}
                                                        alt="Featured"
                                                        className="w-full h-full object-cover rounded-2xl"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5 pt-1 h-36 justify-between">
                                                    <div className="flex flex-col gap-1">
                                                        <h3 className="font-bold text-[20px] text-black transition-colors leading-tight">Our clients</h3>
                                                        <p className="text-[15.5px] text-gray-500 font-medium leading-tight max-w-50">
                                                            Trusted by institutions and government.
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[#0052ff] font-bold text-[14px] mt-auto">
                                                        Learn more <FaChevronRight className="text-[11px]" />
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Developers Mega-Menu Trigger */}
                        <div
                            className="h-full flex items-center relative"
                            onMouseEnter={handleDevelopersMouseEnter}
                            onMouseLeave={handleDevelopersMouseLeave}
                            ref={developersRef}
                        >
                            <button
                                onClick={handleDevelopersClick}
                                className="font-bold text-[16px] text-black hover:text-black h-full flex items-center px-3 cursor-pointer outline-none border-none bg-transparent"
                            >
                                Developers
                            </button>

                            {/* The Developers Mega Menu - Full Width */}
                            {isDevelopersOpen && (
                                <div className="fixed top-20 left-0 w-full bg-white border-b border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.12)] py-12 px-8 flex justify-center z-6000">
                                    <div className="max-w-7xl w-full grid grid-cols-12 gap-10">

                                        {/* Left Side: 2 Columns of Links - Scrollable (Hidden Scrollbar) */}
                                        <div className="col-span-8 grid grid-cols-2 gap-x-12 gap-y-6 max-h-[50vh] overflow-y-auto pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                            {developerCategories.map((col, idx) => (
                                                <div key={idx} className="flex flex-col gap-4">
                                                    <a href="#" className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors group/header w-fit">
                                                        <h4 className="text-black font-bold text-[15px] tracking-wide uppercase">{col.title}</h4>
                                                        <FaChevronRight className="text-[10px] text-gray-400 group-hover/header:text-black transition-colors mt-0.5" />
                                                    </a>
                                                    {col.items.map((item, i) => (
                                                        <a key={i} href="#" className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                            <div className="mt-1 text-gray-400 group-hover:text-black transition-colors">
                                                                {item.icon}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-[17.5px] text-black transition-colors">{item.title}</span>
                                                                <span className="text-[15.5px] text-gray-500 font-medium leading-[1.3]">{item.desc}</span>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Right Side: Featured Promo Area - Compact Side-by-Side */}
                                        <div className="col-span-4 border-l border-gray-100 pl-6 flex items-start">
                                            <a href="#" className="flex items-start gap-6 group cursor-pointer hover:bg-gray-50 p-4 rounded-3xl transition-all duration-300 w-full">
                                                <div className="w-40 h-40 shrink-0">
                                                    <img
                                                        src={developersImg}
                                                        alt="Featured"
                                                        className="w-full h-full object-cover rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-300"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1 pt-1 h-40 justify-between py-1">
                                                    <div className="flex flex-col gap-2">
                                                        <h3 className="font-bold text-[21px] text-black transition-colors leading-[1.2]">World class crypto infrastructure</h3>
                                                        <p className="text-[15.5px] text-gray-500 font-medium leading-[1.4] max-w-55">
                                                            Discover Coinbase's complete crypto-as-a-service platform.
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[#0052ff] font-bold text-[14px] mt-auto">
                                                        Learn more <FaChevronRight className="text-[11px]" />
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Company Mega-Menu Trigger */}
                        <div
                            className="h-full flex items-center relative"
                            onMouseEnter={handleCompanyMouseEnter}
                            onMouseLeave={handleCompanyMouseLeave}
                            ref={companyRef}
                        >
                            <button
                                onClick={handleCompanyClick}
                                className="font-bold text-[16px] text-black hover:text-black h-full flex items-center px-3 cursor-pointer outline-none border-none bg-transparent"
                            >
                                Company
                            </button>

                            {/* The Company Mega Menu - Full Width */}
                            {isCompanyOpen && (
                                <div className="fixed top-20 left-0 w-full bg-white border-b border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.12)] py-12 px-8 flex justify-center z-6000">
                                    <div className="max-w-7xl w-full grid grid-cols-12 gap-10">

                                        {/* Left Side: 2 Columns of Links - Scrollable (Hidden Scrollbar) */}
                                        <div className="col-span-8 grid grid-cols-2 gap-x-12 gap-y-6 max-h-[50vh] overflow-y-auto pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                            {companyCategories.map((col, idx) => (
                                                <div key={idx} className="flex flex-col gap-4">
                                                    {col.items.map((item, i) => (
                                                        <a key={i} href="#" className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                            <div className="mt-1 text-gray-400 group-hover:text-black transition-colors">
                                                                {item.icon}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-[17.5px] text-black transition-colors">{item.title}</span>
                                                                <span className="text-[15.5px] text-gray-500 font-medium leading-[1.3]">{item.desc}</span>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Right Side: Featured Promo Area - Compact Side-by-Side */}
                                        <div className="col-span-4 border-l border-gray-100 pl-6 flex items-start">
                                            <a href="#" className="flex items-start gap-6 group cursor-pointer hover:bg-gray-50 p-4 rounded-3xl transition-all duration-300 w-full">
                                                <div className="w-40 h-40 shrink-0">
                                                    <img
                                                        src={companyImg}
                                                        alt="Featured"
                                                        className="w-full h-full object-cover rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-300"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1 pt-1 h-40 justify-between py-1">
                                                    <div className="flex flex-col gap-2">
                                                        <h3 className="font-bold text-[21px] text-black transition-colors leading-[1.2]">Learn all about Coinbase:</h3>
                                                        <p className="text-[15.5px] text-gray-500 font-medium leading-[1.4] max-w-55">
                                                            We're building the open financial system.
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[#0052ff] font-bold text-[14px] mt-auto">
                                                        Create your account <FaChevronRight className="text-[11px]" />
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>

                {/* 2. Right Side Tools/Buttons */}
                <div className="flex items-center">
                    {!isSearchVisible ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsSearchVisible(true)}
                                    className="bg-gray-100 p-2.5 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                                <div className="hidden md:block relative" ref={languageRef}>
                                    <button
                                        onClick={() => setIsLanguageModalOpen(!isLanguageModalOpen)}
                                        className="bg-gray-100 p-2.5 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                    >
                                        <FiGlobe className="w-5 h-5 text-black" />
                                    </button>

                                    {/* Language and Region Modal */}
                                    {isLanguageModalOpen && (
                                        <div className="absolute top-14 right-0 w-87.5 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 z-7000 p-6 animate-in fade-in zoom-in duration-200">
                                            <h3 className="text-[17px] font-bold text-black mb-4">Language and region</h3>

                                            <div className="relative mb-4">
                                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                                <input
                                                    type="text"
                                                    placeholder="Search"
                                                    value={languageSearch}
                                                    onChange={(e) => setLanguageSearch(e.target.value)}
                                                    className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-[15px] focus:ring-2 focus:ring-[#0052ff] outline-none"
                                                />
                                            </div>

                                            <div className="max-h-60 overflow-y-auto pr-1 -mr-1 custom-scrollbar">
                                                {filteredLanguages.map((lang) => (
                                                    <div
                                                        key={lang.id}
                                                        onClick={() => {
                                                            setSelectedLang(lang.id);
                                                            setTimeout(() => setIsLanguageModalOpen(false), 300);
                                                        }}
                                                        className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
                                                    >
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-[15.5px] text-black">{lang.name}</span>
                                                            <span className="text-[14px] text-gray-500">{lang.region}</span>
                                                        </div>
                                                        {selectedLang === lang.id && (
                                                            <svg className="w-5 h-5 text-[#05b169]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 md:gap-4">
                                {user ? (
                                    <>
                                        <Link to="/profile" className="hidden sm:inline-block bg-[#f0f3f6] text-black px-5 py-2.5 rounded-full font-bold hover:opacity-80 transition-all text-sm md:text-base whitespace-nowrap">
                                            Profile
                                        </Link>
                                        <button 
                                            onClick={() => { logout(); navigate('/'); }}
                                            className="bg-[#0052ff] text-white px-5 py-2.5 rounded-full font-bold hover:bg-[#004bd6] transition-all text-sm md:text-base whitespace-nowrap shadow-sm text-center"
                                        >
                                            Sign out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/signin" className="hidden sm:inline-block bg-[#f0f3f6] text-black px-5 py-2.5 rounded-full font-bold hover:opacity-80 transition-all text-sm md:text-base whitespace-nowrap">
                                            Sign in
                                        </Link>
                                        <Link to="/signup" className="bg-[#0052ff] text-white px-5 py-2.5 rounded-full font-bold hover:bg-[#004bd6] transition-all text-sm md:text-base whitespace-nowrap shadow-sm text-center">
                                            Sign up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="relative flex items-center search-container w-full min-w-[320px] md:min-w-110">
                            <div className="relative flex-1 bg-white border border-gray-200 rounded-full flex items-center px-4 py-2.5 transition-all duration-200 focus-within:border-[#0052ff] focus-within:ring-1 focus-within:ring-[#0052ff] shadow-sm z-10">
                                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent border-none outline-none w-full text-black placeholder-gray-500 font-medium"
                                />
                            </div>

                            {/* Localized Dropdown - Slightly narrower and centered relative to search bar */}
                            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[130%] min-w-87.5 md:min-w-145 bg-white border border-gray-100 shadow-[0_12px_48px_rgba(0,0,0,0.15)] rounded-[20px] p-6 z-6000 animate-in fade-in slide-in-from-top-4 duration-300 overflow-x-hidden">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {['Top', 'Crypto', 'Stocks', 'Predictions', 'Perpetuals', 'Future'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveSearchTab(tab)}
                                            className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors ${activeSearchTab === tab ? 'bg-black text-white' : 'bg-gray-50 text-black hover:bg-gray-100'}`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="max-h-75 overflow-y-auto pr-2 custom-scrollbar">
                                    {isLoading ? (
                                        <div className="flex flex-col gap-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="flex items-center justify-between animate-pulse p-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-gray-100 rounded-full" />
                                                        <div className="w-24 h-4 bg-gray-100 rounded" />
                                                    </div>
                                                    <div className="w-16 h-4 bg-gray-100 rounded" />
                                                </div>
                                            ))}
                                        </div>
                                    ) : error ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500 mb-2">{error}</p>
                                            <button onClick={() => setAssets([])} className="text-[#0052ff] font-bold">Retry</button>
                                        </div>
                                    ) : displayAssets.length > 0 ? (
                                        <div className="flex flex-col">
                                            <div className="px-3 mb-2 flex items-center justify-between">
                                                <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                                                    {searchQuery ? 'Search Results' : 'Trending Assets'}
                                                </h3>
                                                {!searchQuery && (
                                                    <span className="text-[11px] font-bold text-[#0052ff] cursor-pointer hover:underline">
                                                        View all
                                                    </span>
                                                )}
                                            </div>
                                            {displayAssets.slice(0, 10).map(asset => (
                                                <div
                                                    key={asset.id}
                                                    onClick={() => {
                                                        setIsSearchVisible(false);
                                                        setSearchQuery('');
                                                    }}
                                                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                                            <img
                                                                src={asset.icon}
                                                                alt={asset.name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = `https://ui-avatars.com/api/?name=${asset.symbol}&background=random`;
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="font-bold text-black">{asset.name}</span>
                                                                {asset.isStock && <span className="bg-gray-100 text-[10px] px-1.5 py-0.5 rounded font-bold text-gray-500">STOCK</span>}
                                                            </div>
                                                            <span className="text-gray-500 text-sm font-medium">
                                                                {asset.symbol}{activeSearchTab === 'Perpetuals' ? '-PERP' : activeSearchTab === 'Future' ? '-FUT' : ''}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="font-bold text-black text-[15px]">
                                                            ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.price < 1 ? 4 : 2, maximumFractionDigits: asset.price < 1 ? 4 : 2 })}
                                                        </span>
                                                        <span className={`text-sm font-bold ${asset.change >= 0 ? 'text-[#098551]' : 'text-[#cf202f]'}`}>
                                                            {asset.change >= 0 ? '+' : ''}{asset.change?.toFixed(2)}%
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                            {displayAssets.length > 10 && (
                                                <div className="mt-2 pt-2 border-t border-gray-50">
                                                    <button className="w-full py-4 text-[#0052ff] font-bold text-[14px] hover:bg-gray-50 rounded-xl transition-colors">
                                                        See all results for "{searchQuery || activeSearchTab}"
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-gray-400 text-[15px] font-medium text-center py-8">
                                            {searchQuery ? `No results for "${searchQuery}"` : "No recent searches"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-black text-2xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FaXmark /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-white z-5000 lg:hidden flex flex-col h-screen overflow-hidden">
                    {/* Drawer Top Bar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>
                            <img src={logo} alt="Coinbase" className="w-10 h-10 object-contain" />
                        </Link>

                        <div className="flex items-center gap-3">
                            <button className="p-2 text-gray-700">
                                <IoSearchOutline className="text-2xl" />
                            </button>
                            <Link
                                to="/signup"
                                onClick={() => setIsMenuOpen(false)}
                                className="bg-[#0052FF] text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-[#0039B3] transition-colors"
                            >
                                Sign up
                            </Link>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-black text-2xl"
                            >
                                <FaXmark />
                            </button>
                        </div>
                    </div>

                    <div className="grow h-full px-6 py-2 overflow-hidden">
                        <div className="flex flex-col">
                            <Link
                                to="/explore"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between font-bold text-[17px] py-3 px-2 hover:bg-gray-50 rounded-xl text-black transition-colors"
                            >
                                Cryptocurrencies
                            </Link>

                            {[
                                { title: 'Individuals', to: '#' },
                                { title: 'Businesses', to: '#' },
                                { title: 'Institutions', to: '#' },
                                { title: 'Developers', to: '#' },
                                { title: 'Company', to: '#' }
                            ].map((item) => (
                                <Link
                                    key={item.title}
                                    to={item.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between font-bold text-[17px] py-3 px-2 hover:bg-gray-50 rounded-xl text-black transition-colors group"
                                >
                                    {item.title}
                                    <FaChevronRight className="text-gray-300 text-xs transition-transform group-hover:translate-x-1" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Drawer Bottom Bar */}
                    <div className="px-6 py-4 border-t border-gray-100 bg-white">
                        <div className="flex items-center gap-4">
                            <button className="flex items-center text-gray-700 hover:text-black transition-colors">
                                <FiGlobe className="text-xl" />
                            </button>
                            <Link
                                to="/signin"
                                onClick={() => setIsMenuOpen(false)}
                                className="bg-gray-100 text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;

