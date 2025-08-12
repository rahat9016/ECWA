// "use client"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
//   SidebarSeparator,
// } from "@/components/ui/sidebar"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { ChevronDown, LayoutDashboard, Package, Heart, User, Settings, LogOut } from "lucide-react"

// // Client navigation items
// const navItems = [
//   {
//     title: "Overview",
//     href: "/client/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "My Orders",
//     href: "/client/orders",
//     icon: Package,
//   },
//   {
//     title: "Wishlist",
//     href: "/client/wishlist",
//     icon: Heart,
//   },
//   {
//     title: "Profile",
//     href: "/client/profile",
//     icon: User,
//   },
//   {
//     title: "Settings",
//     href: "/client/settings",
//     icon: Settings,
//   },
// ]

// export function AppSidebar() {
//   const pathname = usePathname()

//   return (
//     <Sidebar>
//       <SidebarHeader>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <SidebarMenuButton className="w-full">
//               <Avatar className="h-6 w-6">
//                 <AvatarImage src="/placeholder-user.jpg" alt="Client Name" />
//                 <AvatarFallback>CN</AvatarFallback>
//               </Avatar>
//               <span className="truncate">Client Name</span>
//               <ChevronDown className="ml-auto h-4 w-4 shrink-0" />
//             </SidebarMenuButton>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
//             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>
//               <Link href="/client/profile" className="flex items-center w-full">
//                 <User className="mr-2 h-4 w-4" /> Profile
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <Link href="/client/settings" className="flex items-center w-full">
//                 <Settings className="mr-2 h-4 w-4" /> Settings
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>
//               <LogOut className="mr-2 h-4 w-4" /> Log Out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Navigation</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {navItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild isActive={pathname === item.href}>
//                     <Link href={item.href}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter>
//         <SidebarSeparator />
//         <div className="p-2 text-xs text-gray-500">
//           <p>&copy; 2023 Vercel. All rights reserved.</p>
//         </div>
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   )
// }
