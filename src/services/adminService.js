const INITIAL_MENU = [
  { id: 1, name: 'Penyetan Telur', category: 'Makanan', price: '10.000', stock: 'Tidak Tersedia', image: "https://www.figma.com/api/mcp/asset/f7eb8a35-cb5b-4d79-a39b-6906a8e35993", isBestSeller: true, description: 'Penyetan telur dengan sambal khas.' },
  { id: 2, name: 'Penyetan Ayam', category: 'Makanan', price: '15.000', stock: 'Tersedia', image: "https://www.figma.com/api/mcp/asset/4200e69f-d844-477a-b1b6-0144068432a2", isBestSeller: true, description: 'Penyetan ayam goreng gurih.' },
  { id: 3, name: 'Penyetan Ati Ampela', category: 'Makanan', price: '12.000', stock: 'Tidak Tersedia', image: "https://www.figma.com/api/mcp/asset/5a1d13c5-e29c-47ef-a47d-b3f0f637bd3c", isBestSeller: false, description: 'Ati ampela goreng penyet.' },
  { id: 4, name: 'Penyetan Tempe', category: 'Makanan', price: '8.000', stock: 'Tersedia', image: "https://www.figma.com/api/mcp/asset/3984abf0-1453-43cc-9e69-0d4f22984b17", isBestSeller: false, description: 'Tempe goreng penyet ekonomis.' },
  { id: 5, name: 'Es Teh Manis', category: 'Minuman', price: '3.000', stock: 'Tersedia', image: "https://www.figma.com/api/mcp/asset/00ef6687-870c-47f2-965b-0b38d6564fbb", isBestSeller: false, description: 'Es teh manis segar.' },
  { id: 6, name: 'Es Jeruk', category: 'Minuman', price: '5.000', stock: 'Tidak Tersedia', image: "https://www.figma.com/api/mcp/asset/91bbe1c5-bfbc-45cd-a54e-9275dce5048a", isBestSeller: false, description: 'Es jeruk peras asli.' },
];

const INITIAL_ORDERS = [
  { 
    id: '#JOS-18427', 
    customer: 'Alex Trie', 
    table: '02', 
    items: 2, 
    total: 'Rp 22.000', 
    status: 'Menunggu', 
    timestamp: new Date().toISOString(),
    notes: 'Sambalnya dipisah',
    items_list: [
      { name: 'Penyetan Ayam', quantity: 1, price: 'Rp 18.000' },
      { name: 'Es Jeruk', quantity: 1, price: 'Rp 4.000' }
    ]
  },
  { 
    id: '#JOS-18428', 
    customer: 'Budi Santoso', 
    table: '05', 
    items: 3, 
    total: 'Rp 45.000', 
    status: 'Diproses', 
    timestamp: new Date().toISOString(),
    notes: 'Tidak pakai sayur',
    items_list: [
      { name: 'Penyetan Telur', quantity: 2, price: 'Rp 20.000' },
      { name: 'Es Teh Manis', quantity: 1, price: 'Rp 3.000' },
      { name: 'Ekstra Sambal', quantity: 1, price: 'Rp 2.000' }
    ]
  },
  { 
    id: '#JOS-18429', 
    customer: 'Siti Aminah', 
    table: '01', 
    items: 1, 
    total: 'Rp 15.000', 
    status: 'Selesai', 
    timestamp: new Date().toISOString(),
    notes: '',
    items_list: [
      { name: 'Penyetan Ayam', quantity: 1, price: 'Rp 15.000' }
    ]
  },
];

const getStoredData = (key, initial) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
};

export const adminService = {
  // Menu Management
  getMenu: () => getStoredData('admin_menu', INITIAL_MENU),
  
  saveMenuItem: (item) => {
    const menu = adminService.getMenu();
    let newMenu;
    if (item.id) {
      newMenu = menu.map(m => m.id === item.id ? item : m);
    } else {
      const newId = menu.length > 0 ? Math.max(...menu.map(m => m.id)) + 1 : 1;
      newMenu = [...menu, { ...item, id: newId }];
    }
    localStorage.setItem('admin_menu', JSON.stringify(newMenu));
    return newMenu;
  },

  deleteMenuItem: (id) => {
    const menu = adminService.getMenu();
    const newMenu = menu.filter(m => m.id !== id);
    localStorage.setItem('admin_menu', JSON.stringify(newMenu));
    return newMenu;
  },

  getMenuItem: (id) => {
    const menu = adminService.getMenu();
    return menu.find(m => m.id === parseInt(id));
  },

  // Orders Management
  getOrders: () => getStoredData('admin_orders', INITIAL_ORDERS),
  
  updateOrderStatus: (id, status) => {
    const orders = adminService.getOrders();
    const newOrders = orders.map(o => o.id === id ? { ...o, status } : o);
    localStorage.setItem('admin_orders', JSON.stringify(newOrders));
    return newOrders;
  }
};
