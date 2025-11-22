<template>
  <div class="relative min-h-[calc(100vh-2rem)] bg-gradient-to-br from-[#202e48] to-[#dbeafe] py-6 px-8">
    <!-- Top Greeting Banner -->
    <div class="rounded-2xl bg-gradient-to-r from-[#246af3] via-[#357Cf5] to-[#3588ff] text-white py-7 px-14 flex justify-between items-center mb-8 shadow-lg">
      <div>
        <h1 class="text-4xl font-bold mb-1">Welcome back, Owner</h1>
        <p class="text-lg font-light">Here's what's happening with your business today</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="bg-white/20 px-8 py-4 rounded-xl flex flex-col items-center">
          <span class="font-semibold">Olivia Wilson</span>
          <span class="text-xs">Business Owner</span>
        </div>
        <div class="rounded-full bg-white/20 p-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="9" r="3"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14a7 7 0 00-7 7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Top Card Section -->
    <div class="grid grid-cols-3 gap-6 mb-8">
      <div class="rounded-2xl bg-white p-6 flex items-center shadow">
        <div class="flex items-center gap-6 w-full justify-between">
          <div>
            <div class="rounded-xl bg-violet-100 p-3 inline-block mb-2">
              <span class="text-2xl text-violet-600">$</span>
            </div>
            <div class="font-semibold text-slate-600">Total Revenue</div>
            <div class="text-2xl font-bold text-slate-900 mt-1">₱360</div>
          </div>
          <span class="bg-violet-600 text-white px-4 py-1 rounded-full font-medium">Today</span>
        </div>
      </div>
      <div class="rounded-2xl bg-white p-6 flex items-center shadow">
        <div class="flex items-center gap-6 w-full justify-between">
          <div>
            <div class="rounded-xl bg-orange-100 p-3 inline-block mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
              </svg>
            </div>
            <div class="font-semibold text-slate-600">Collectables</div>
            <div class="text-2xl font-bold text-slate-900 mt-1">3</div>
          </div>
          <span class="bg-orange-500 text-white px-4 py-1 rounded-full font-medium">Today</span>
        </div>
      </div>
      <div class="rounded-2xl bg-gradient-to-r from-[#246af3] to-[#3588ff] p-6 shadow flex flex-col justify-between">
        <div class="flex items-center gap-4">
          <span class="bg-white/20 rounded-xl p-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 20h12M10 6l4 4-4 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <div>
            <div class="text-white font-semibold">Add New Sale</div>
            <div class="text-xl font-bold text-white">Click to Add</div>
          </div>
        </div>
        <span class="absolute top-6 right-10 bg-white/30 text-white px-4 py-1 rounded-full font-medium">Quick Action</span>
      </div>
    </div>

    <!-- Main Grids -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Total Sales Summary -->
      <div class="rounded-2xl bg-white p-6 shadow-lg mb-6">
        <div class="font-semibold text-2xl mb-1 text-slate-900">Total Sales Summary</div>
        <div class="text-base text-slate-500 mb-6">Overview of your sales performance</div>
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-xl bg-green-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-green-500 text-2xl">$</span>
              <span class="text-xs bg-green-100 text-green-700 rounded px-2 py-1">↑ 233.3%</span>
            </div>
            <span class="font-semibold text-slate-500">Total Earnings</span>
            <span class="font-bold text-xl text-slate-900 mt-1">₱360</span>
          </div>
          <div class="rounded-xl bg-blue-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-blue-500 text-2xl">B</span>
            </div>
            <span class="font-semibold text-slate-500">Total Gallons Sold</span>
            <span class="font-bold text-xl text-slate-900 mt-1">18 <span class="text-xs">gallons</span></span>
          </div>
          <div class="rounded-xl bg-purple-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-purple-500 text-2xl">📅</span>
            </div>
            <span class="font-semibold text-slate-500">Avg Sales per Day</span>
            <span class="font-bold text-xl text-slate-900 mt-1">₱360</span>
          </div>
          <div class="rounded-xl bg-orange-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-orange-500 text-2xl">🧾</span>
            </div>
            <span class="font-semibold text-slate-500">Total Transactions</span>
            <span class="font-bold text-xl text-slate-900 mt-1">4 <span class="text-xs text-green-600">completed</span></span>
          </div>
        </div>
      </div>
      <!-- Total Refills Overview -->
      <div class="rounded-2xl bg-white p-6 shadow-lg mb-6">
        <div class="font-semibold text-2xl mb-1 text-slate-900">Total Refills Overview</div>
        <div class="text-base text-slate-500 mb-6">Breakdown of refill types and volumes</div>
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-xl bg-sky-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sky-500 text-2xl">📦</span>
              <span class="text-xs bg-sky-100 text-sky-700 rounded px-2 py-1">orders</span>
            </div>
            <span class="font-semibold text-slate-500">Total Refills Completed</span>
            <span class="font-bold text-xl text-slate-900 mt-1">4</span>
          </div>
          <div class="rounded-xl bg-green-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-green-500 text-2xl">🚶</span>
              <span class="text-xs bg-green-100 text-green-700 rounded px-2 py-1">100%</span>
            </div>
            <span class="font-semibold text-slate-500">Walk-in Refills</span>
            <span class="font-bold text-xl text-slate-900 mt-1">4</span>
          </div>
          <div class="rounded-xl bg-purple-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-purple-500 text-2xl">🚚</span>
              <span class="text-xs bg-purple-100 text-purple-700 rounded px-2 py-1">0%</span>
            </div>
            <span class="font-semibold text-slate-500">Delivery Refills</span>
            <span class="font-bold text-xl text-slate-900 mt-1">0</span>
          </div>
          <div class="rounded-xl bg-blue-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-blue-500 text-2xl">💧</span>
            </div>
            <span class="font-semibold text-slate-500">Total Gallons Dispensed</span>
            <span class="font-bold text-xl text-slate-900 mt-1">18 <span class="text-xs">gallons</span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Overview Section Starts Here -->
    <div class="rounded-2xl bg-white p-8 shadow-lg mt-8">
      <div class="mb-2">
        <div class="text-2xl font-semibold text-gray-800">Transaction Overview</div>
        <div class="text-base text-gray-500">All transactions and orders</div>
      </div>
      <div class="flex gap-4 items-center mb-8">
        <div class="flex-1">
          <div class="relative">
            <input
              type="text"
              placeholder="Search customer name..."
              class="w-full py-3 pl-12 rounded-xl bg-[#f5faff] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400"
            />
            <span class="absolute left-4 top-3.5 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="8" stroke-width="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="rounded-xl bg-blue-600 text-white px-6 py-2 font-semibold shadow hover:bg-blue-700 transition">All</button>
          <button class="rounded-xl bg-white text-gray-700 px-6 py-2 font-semibold shadow hover:bg-blue-200 transition">Done</button>
          <button class="rounded-xl bg-white text-orange-600 px-6 py-2 font-semibold shadow hover:bg-orange-100 transition">Collectables</button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-gray-700">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-3 font-semibold text-left">Customer</th>
              <th class="px-4 py-3 font-semibold text-left">Type</th>
              <th class="px-4 py-3 font-semibold text-left">Date &amp; Time</th>
              <th class="px-4 py-3 font-semibold text-left">Gallons</th>
              <th class="px-4 py-3 font-semibold text-left">Amount</th>
              <th class="px-4 py-3 font-semibold text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b hover:bg-gray-50 transition">
              <td class="px-4 py-3 flex items-center gap-3">
                <span class="rounded-full bg-blue-500 text-white w-9 h-9 flex items-center justify-center font-semibold shadow">P</span>
                Princess Estialbo
              </td>
              <td class="px-4 py-3">
                <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg font-semibold">Delivery</span>
              </td>
              <td class="px-4 py-3">2025-10-20 <span class="text-gray-400 text-xs block">2h ago</span></td>
              <td class="px-4 py-3 flex items-center gap-2"><span class="text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 20v-5m8 5v-5m3-9a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h9a2 2 0 002-2V6z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>6 gal</td>
              <td class="px-4 py-3 font-bold">₱120</td>
              <td class="px-4 py-3">
                <span class="flex items-center gap-2 text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Collectables
                </span>
              </td>
            </tr>
            <tr class="border-b hover:bg-gray-50 transition">
              <td class="px-4 py-3 flex items-center gap-3">
                <span class="rounded-full bg-blue-500 text-white w-9 h-9 flex items-center justify-center font-semibold shadow">L</span>
                Leizl Juntilla
              </td>
              <td class="px-4 py-3">
                <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg font-semibold">Delivery</span>
              </td>
              <td class="px-4 py-3">2025-10-20 <span class="text-gray-400 text-xs block">08:00 AM</span></td>
              <td class="px-4 py-3 flex items-center gap-2"><span class="text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 20v-5m8 5v-5m3-9a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h9a2 2 0 002-2V6z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>7 gal</td>
              <td class="px-4 py-3 font-bold">₱140</td>
              <td class="px-4 py-3">
                <span class="flex items-center gap-2 text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Collectables
                </span>
              </td>
            </tr>
            <tr class="border-b hover:bg-gray-50 transition">
              <td class="px-4 py-3 flex items-center gap-3">
                <span class="rounded-full bg-blue-500 text-white w-9 h-9 flex items-center justify-center font-semibold shadow">J</span>
                Jhon Emboy
              </td>
              <td class="px-4 py-3">
                <span class="bg-green-100 text-green-600 px-3 py-1 rounded-lg font-semibold">Walk-in</span>
              </td>
              <td class="px-4 py-3">2025-10-20 <span class="text-gray-400 text-xs block">08:00 AM</span></td>
              <td class="px-4 py-3 flex items-center gap-2"><span class="text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 20v-5m8 5v-5m3-9a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h9a2 2 0 002-2V6z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>3 gal</td>
              <td class="px-4 py-3 font-bold">₱60</td>
              <td class="px-4 py-3">
                <span class="flex items-center gap-2 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" /><path d="M16 12l-4 4-4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Done
                </span>
              </td>
            </tr>
            <tr class="border-b hover:bg-gray-50 transition">
              <td class="px-4 py-3 flex items-center gap-3">
                <span class="rounded-full bg-blue-500 text-white w-9 h-9 flex items-center justify-center font-semibold shadow">G</span>
                Grant Lucida
              </td>
              <td class="px-4 py-3">
                <span class="bg-green-100 text-green-600 px-3 py-1 rounded-lg font-semibold">Walk-in</span>
              </td>
              <td class="px-4 py-3">2025-10-20 <span class="text-gray-400 text-xs block">2m ago</span></td>
              <td class="px-4 py-3 flex items-center gap-2"><span class="text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 20v-5m8 5v-5m3-9a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h9a2 2 0 002-2V6z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>5 gal</td>
              <td class="px-4 py-3 font-bold">₱100</td>
              <td class="px-4 py-3">
                <span class="flex items-center gap-2 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" /><path d="M16 12l-4 4-4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Done
                </span>
              </td>
            </tr>
            <!-- Add more rows as needed -->
          </tbody>
        </table>
      </div>
    </div>
    <!-- Transaction Overview Section Ends -->
  </div>
</template>

<script>
export default { name: 'Dashboard' }
</script>
