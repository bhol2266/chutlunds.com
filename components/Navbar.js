import { updateloggedIn } from "../config/firebase/lib";
import { deleteCookie } from "cookies-next";
import { useContext, useEffect, useRef, useState, } from 'react';
import ReactCountryFlag from "react-country-flag";
import { UserAuth } from "../context/AuthContext";
import videosContext from '../context/videos/videosContext';

import { Fragment } from 'react';

import { useSession, signOut } from 'next-auth/react';


import {
    MenuIcon,
    SearchIcon
} from '@heroicons/react/outline';
import { } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

var navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Category', href: '/category', current: false },
    { name: 'Pornstars', href: '/pornstar', current: false },
    { name: 'Channels', href: '/channels', current: false },
    { name: 'Sex Chat', href: 'https://play.google.com/store/apps/details?id=com.bhola.livevideochat4&hl=en-IN', current: false },
    // { name: 'Join Now', href: '/membership', current: false },
    // { name: 'Live Cams', href: "https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers", current: false },
    // { name: 'Meet & Fuck', href: "https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers", current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Navbar() {

    const { user, setUser, logOut } = UserAuth();

    const { data: session } = useSession();


    const router = useRouter();
    const currentPath = router.pathname;

    const context = useContext(videosContext);
    const { currentLocation, countryBlocked } = context;

    const [location, setlocation] = useState(currentLocation)
    const [searchKey, setsearchKey] = useState('')
    const [showSuggested, setshowSuggested] = useState(false)

    useEffect(() => {

        if (localStorage.getItem("location") && !currentLocation) {
            setlocation(JSON.parse(localStorage.getItem("location")))
        }


    }, [])

    useEffect(() => {
        if (session) {
            setUser(session.user);
        } else {
            setUser(null);
        }
    }, [session]);


    const signOut_method = async () => {


        const Email = user.email
        deleteCookie('membership');
        deleteCookie('countryUpdated_DB');
        deleteCookie('account');
        deleteCookie('email');

        await updateloggedIn(Email, false)
        await signOut({ redirect: false }); // Do not redirect
        window.location.reload(); // Manually refresh the page
    }



    const [searchBarVisibility, setsearchBarVisibility] = useState('hidden');
    const [tags, settags] = useState([])
    const searchInputref = useRef('')
    const handleSearchIconClick = () => {
        if (searchBarVisibility === 'hidden') {
            setsearchBarVisibility('flex')
        } else {
            setsearchBarVisibility('hidden')

        }
        router.push('/search')
    }
    const goSearch = (e) => {
        e.preventDefault();

        setshowSuggested(false);

        if (e.target[0].value) {
            router.push(`/search/${e.target[0].value.trim()
                }`)

        }

    }



    const handleClickFlag = () => {
        router.push({
            pathname: '/VideosList',
            query: {
                key: location.country_name,
                name: `Trending Porn videos in ${location.country_name}`
            }
        })
    }

    const getSuggestedTags = (e) => {
        setshowSuggested(true)
        setsearchKey(e.target.value)
        settags([])


        if (e.target.value.trim().length <= 2) {
            return
        } else {
            var tagsData = [];
            const abcdArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


            const FIRST_LETTER = e.target.value.charAt(0).trim().toUpperCase();
            tagsData = require(`../JsonData/tags/${FIRST_LETTER}.json`)

            for (let index = 0; index < abcdArray.length; index++) {
                if (abcdArray[index].trim() == FIRST_LETTER) {
                } else {
                    var Data = require(`../JsonData/tags/${abcdArray[index]}.json`)
                    tagsData = tagsData.concat(Data)
                }
            }
            var filteredTagArray = tagsData.filter(keyword => {
                if (keyword.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())) {
                    return keyword
                }
            })
            settags(filteredTagArray)
        }
    }

    return (

        <div className='font-inter bg-semiblack'>

            <div className=" text-white p-2  lg:hidden">

                <Disclosure as="nav" >
                    {({ open }) => (
                        <>
                            <div className='flex  items-center justify-between'>

                                <div className='flex items-center space-x-1' >

                                    <Link href='/'>
                                        <img src='/logo.png' alt="loading..." className='w-[200px]' />
                                    </Link>
                                    {location &&
                                        <div className='cursor-pointer' onClick={handleClickFlag}>
                                            <ReactCountryFlag
                                                svg
                                                countryCode={location.countryCode}
                                                style={{
                                                    fontSize: '25px',
                                                    lineHeight: '25px',
                                                }}
                                                aria-label="United States"
                                            />
                                        </div>
                                    }

                                </div>






                                <div className='flex items-center'>

                                    <div onClick={handleSearchIconClick} className=' lg:hidden mr-2 cursor-pointer p-2  hover:bg-button hover:text-white rounded-md '>
                                        <SearchIcon className='h-6 w-6' />
                                    </div>

                                    <Menu as="div" className="relative mx-1 mr-2">
                                        <div>
                                            <Menu.Button className=" ">

                                                {!user &&
                                                    <img src='/login/user.png' className='cursor-pointer h-5 w-5 mt-1.5'></img>
                                                }

                                                {user &&
                                                    <img src='/login/userOnline.png' className='cursor-pointer h-5 w-5 mt-1.5'></img>
                                                }
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="flex flex-col justify-start origin-top-right absolute -right-[50px] lg:-right-[125px] mt-3  w-[200px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20 pb-4">



                                                {!user &&
                                                    <Menu.Item>
                                                        <button onClick={() =>router.push("/account/login")} className='text-white w-[150px] h-[30px] text-[11px] font-inter px-[25px] py-[7px] bg-button hover:bg-button_hover rounded mt-[24px] mx-auto'>
                                                            Sign In / Sign Up
                                                        </button>
                                                    </Menu.Item>


                                                }

                                                {user &&
                                                    <h2 className='font-Opensans text-semiblack  text-[12px] cursor-pointer text-center font-semibold my-2'>{user.email}</h2>
                                                }


                                                {user &&
                                                    <Menu.Item>
                                                        <button onClick={signOut_method} className='text-white w-[150px] h-[30px] text-[11px] font-inter px-[25px] py-[7px] bg-button hover:bg-button_hover rounded mt-[8px] mx-auto'>
                                                            Sign Out
                                                        </button>
                                                    </Menu.Item>
                                                }

                                                <Menu.Item>
                                                    <h2 className='cursor-pointer text-[11px] font-DMsans text-[#001857] w-fit mx-auto mb-28px mt-[14px]'>Need Help ?</h2>
                                                </Menu.Item>

                                            </Menu.Items>
                                        </Transition>
                                    </Menu>


                                    <Disclosure.Button className="lg:hidden items-center justify-center rounded-md text-white hover:bg-button p-2">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>



                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Disclosure.Panel className="">




                                    <div className="px-2 pt-2 pb-3 space-y-1">
                                        {navigation.map((item) => (


                                            <a href={item.href} key={item.name} >
                                                <Disclosure.Button
                                                    as="a"
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'block px-3 py-2 rounded-md text-base font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Disclosure.Button>
                                            </a>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>

                <div className={`flex flex-col relative p-1 ${searchBarVisibility}  transition ease-in-out delay-150 mt-2 `}>

                    <form className=' w-full flex items-center' onSubmit={goSearch}>

                        <input value={searchKey} onChange={getSuggestedTags} ref={searchInputref} className='flex-grow  outline-none text-inter text-sm border-gray-300 rounded pl-2  h-[35px] text-semiblack' type="text" placeholder='Search your favourite porn video...' />

                        <button type="submit" className='bg-button  hover:bg-button_hover text-white text-sm p-2 pl-4 pr-4 m-1 rounded '>Search</button>

                    </form>
                    {showSuggested &&
                        <div className='bg-white max-h-[300px] rounded z-50  overflow-scroll scrollbar-hide'>
                            {tags.map(tag => {
                                return (
                                    <div key={tag} onClick={() => {
                                        setsearchKey(tag); setshowSuggested(false); router.push(`/search/${tag.trim()}`)
                                    }} className='flex items-center space-x-2 p-2 border-[1px] border-gray-300 cursor-pointer hover:bg-gray-200 pl-4'>
                                        {/* <img src='/login/history.png' className='h-[20px]' /> */}
                                        <p className='text-[12px] fontinter text-semiblack'>{tag}</p>

                                    </div>
                                )
                            })}
                        </div>
                    }



                </div>



            </div>

            <div className='flex justify-around items-center shadow-lg lg:hidden font-arial'>
                <Link href='/'>

                    <p className={`sm:text-xl xl:text-[28px] text-md text-white text-center p-1  border-b-[3px] ${currentPath === '/' ? 'border-[#FFBB00]' : 'hover:border-[#FFBB00] border-transparent'}`}>
                        Home
                    </p>
                </Link>

                <Link href='/category'>
                    <p className={`sm:text-xl xl:text-[28px] text-md text-white text-center p-1  border-b-[3px] ${currentPath === '/category' ? 'border-[#FFBB00]' : 'hover:border-[#FFBB00] border-transparent'}`}>
                        Categories
                    </p>
                </Link>

                <Link href='/channels'>
                    <div className={`group flex items-center justify-center space-x-1 -mb-1 pb-1  border-b-[3px] ${currentPath === '/channels' ? 'border-[#FFBB00]' : 'hover:border-[#FFBB00] border-transparent'}`}>
                        <img src="/channel.png" alt="" className='h-5 m' />
                        <p className={`sm:text-xl xl:text-[28px] text-md text-white text-center mb-0`}>
                            Channels
                        </p>
                    </div>
                </Link>


                <Link href='/membership'>
                    <p className='sm:text-md text-sm text-semiblack rounded-[22px] text-center px-3 p-1 m-1 bg-[#FFBB00] hover:scale-105 transition-transform duration-30'>
                        Join Now
                    </p>
                </Link>
            </div>



            {/* Large Sreeen NavBar  */}

            <div className='flex-col hidden lg:flex  ' >


                {/* Navbar */}
                <div className=' flex items-center justify-between  pt-2 pb-2 text-white '>

                    <div className='flex items-center space-x-1 md:space-x-3  ml-2' >

                        <Link href='/'>
                            <img src='/logo.png' alt="loading..." className='w-[250px]' />
                        </Link>
                        {location &&

                            <div className='cursor-pointer pt-1' onClick={handleClickFlag}>
                                <ReactCountryFlag
                                    svg
                                    countryCode={location.countryCode}
                                    style={{
                                        fontSize: '25px',
                                        lineHeight: '25px',
                                    }}
                                    aria-label="United States"
                                />
                            </div>
                        }



                        <a target="_blank" href={countryBlocked ? "https://go.xxxiijmp.com/?userId=9ea31ff27db3b7242eabcc2d26ac0eaf38f093c68528e70c2e7f5a72df55c42e" : "https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers"} rel="noopener noreferrer">
                            <div className='pl-8  flex  items-center 
                             cursor-pointer hover:scale-105  transition-all space-x-2'>
                                <img
                                    src='/livesex.png'
                                    height={35}
                                    width={35}
                                    alt='loading'
                                ></img>
                                <p className='font-bold '>Live Sex</p>
                            </div>
                        </a>
                    </div>


                    <div className='flex space-x-4 items-center justify-end font-theme'>
                        <form className=' flex items-center ' onSubmit={goSearch}>



                            <div className='relative'>
                                <input value={searchKey} onChange={getSuggestedTags} ref={searchInputref} className='w-[250px] flex-grow border-2 outline-none border-gray-300 rounded pl-2 h-10  text-sm text-semiblack' type="text" placeholder='Search your favourite porn video...' />

                                {showSuggested &&

                                    <div className='bg-white rounded absolute top-[44px] left-0 right-0 max-h-[300px] z-50 overflow-hidden overflow-scroll scrollbar-hide'>
                                        {tags.map(tag => {
                                            return (
                                                <div key={tag} onClick={() => {
                                                    setsearchKey(tag); setshowSuggested(false); router.push(`/search/${tag.trim()}`)
                                                }} className='flex items-center space-x-2 p-2 border-[1px] border-gray-300 cursor-pointer hover:bg-gray-200 pl-4'>
                                                    <p className='text-[12px] fontinter text-semiblack'>{tag}</p>

                                                </div>
                                            )
                                        })}
                                    </div>
                                }
                            </div>
                            <button type="submit" className='ml-4 bg-button  hover:bg-button_hover text-white text-sm h-10  pl-4 pr-4 m-1 rounded '>Search</button>



                        </form>
                        {/* <button className='bg-red-800  hover:bg-red-900 text-white text-sm h-10  pl-4 pr-4 m-1 rounded '>Upload</button> */}


                        {/* <div >
                            <button className='p-1 pl-2 pr-2 border-2 border-black  rounded-l'>
                                <SunIcon onClick={enableLightMode} className='h-8 w-8 text-white' />
                            </button>
                            <button className='p-1 pl-2 pr-2 border-2 border-black  rounded-r'>
                                <MoonIcon onClick={enableDarkMode} className='h-8 w-8' />
                            </button>
                        </div> */}

                        <div className='flex items-center '>
                            {/* <UserIcon className='h-8 w-8' /> */}

                            {!user &&
                                <div className='flex items-center space-x-2 pr-12 font-inter'>
                                    <p onClick={() =>router.push("/account/login")} className=' m-2 rounded underline  pl-2 pr-2  cursor-pointer hover:text-white'>Login</p>
                                    {/* <p onClick={() => { router.push('/account/register') }} className='m-1 underline rounded   pl-2 pr-2  cursor-pointer hover:text-white'>Register</p> */}
                                </div>
                            }

                            {user &&
                                <div className='flex items-center space-x-2 pr-12 font-inter'>
                                    <p className=' m-2 rounded underline   pl-2 pr-2 cursor-pointer '>{user.email}</p>
                                    <button className='font-inter bg-green-500 px-3 py-1 rounded' onClick={signOut_method}>Logout</button>
                                </div>
                            }
                            <Link href='/membership'>
                                <button className="bg-[#FFBB00] text-semiblack rounded-[22px] font-semibold text-center px-5 p-1.5 m-1 text-md block_popunder hover:scale-105 transition-transform duration-300">Join Now</button>
                            </Link>

                        </div>
                    </div>

                </div>






                <div className='w-full  text-white items-center justify-around   flex  px-1 shadow-lg'>
                    {navigation.map(item => {
                        const isActive = currentPath === item.href;

                        return (
                            <Link href={item.href} legacyBehavior key={item.name}>
                                <a
                                    className={`text-xl 2xl:text-2xl font-semibold text-white cursor-pointer p-1 border-b-4 
                    ${isActive ? 'border-[#FFBB00]' : 'border-transparent hover:border-[#FFBB00]'}
                    transition-colors duration-300`}
                                >
                                    {item.name}
                                </a>
                            </Link>
                        )
                    })}




                </div>

            </div>


        </div>
    )
}

export default Navbar
