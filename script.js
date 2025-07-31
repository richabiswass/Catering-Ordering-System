// Global variables
        let currentUser = null;
        let isAdmin = false;
        let cart = [];
        let products = [];
        let orders = [];
        let users = [];
        let currentPage = 'home';
        
        // Sample data for demo
        const sampleProducts = [
            {
                id: '1',
                name: 'Paneer Tikka',
                category: 'appetizers',
                price: 250,
                description: 'Marinated cottage cheese cubes grilled to perfection with bell peppers and onions.',
                image: createFoodSVG('orange'),
                status: 'active'
            },
            {
                id: '2',
                name: 'Butter Chicken',
                category: 'main-course',
                price: 350,
                description: 'Tender chicken pieces cooked in a rich tomato and butter gravy with aromatic spices.',
                image: createFoodSVG('brown'),
                status: 'active'
            },
            {
                id: '3',
                name: 'Vegetable Biryani',
                category: 'main-course',
                price: 280,
                description: 'Fragrant basmati rice cooked with mixed vegetables and aromatic spices.',
                image: createFoodSVG('green'),
                status: 'active'
            },
            {
                id: '4',
                name: 'Gulab Jamun',
                category: 'desserts',
                price: 150,
                description: 'Soft milk solids dumplings soaked in rose-flavored sugar syrup.',
                image: createFoodSVG('pink'),
                status: 'active'
            },
            {
                id: '5',
                name: 'Masala Chai',
                category: 'beverages',
                price: 80,
                description: 'Traditional Indian spiced tea with milk and aromatic spices.',
                image: createFoodSVG('brown'),
                status: 'active'
            },
            {
                id: '6',
                name: 'Samosa',
                category: 'appetizers',
                price: 120,
                description: 'Crispy pastry filled with spiced potatoes and peas.',
                image: createFoodSVG('yellow'),
                status: 'active'
            },
            {
                id: '7',
                name: 'Dal Makhani',
                category: 'main-course',
                price: 220,
                description: 'Creamy black lentils cooked with butter and spices.',
                image: createFoodSVG('brown'),
                status: 'active'
            },
            {
                id: '8',
                name: 'Rasmalai',
                category: 'desserts',
                price: 180,
                description: 'Soft cottage cheese patties soaked in sweetened, thickened milk delicately flavored with cardamom.',
                image: createFoodSVG('yellow'),
                status: 'active'
            }
        ];
        
        const sampleOrders = [
            {
                id: 'ORD001',
                userId: 'user1',
                customerName: 'Rahul Sharma',
                customerPhone: '+91 9876543210',
                customerAddress: '123 Main St, Mumbai, Maharashtra, 400001',
                items: [
                    { productId: '1', name: 'Paneer Tikka', price: 250, quantity: 2 },
                    { productId: '4', name: 'Gulab Jamun', price: 150, quantity: 1 }
                ],
                subtotal: 650,
                deliveryFee: 50,
                tax: 32.5,
                total: 732.5,
                status: 'delivered',
                date: '2023-06-15T10:30:00',
                paymentMethod: 'cod'
            },
            {
                id: 'ORD002',
                userId: 'user1',
                customerName: 'Rahul Sharma',
                customerPhone: '+91 9876543210',
                customerAddress: '123 Main St, Mumbai, Maharashtra, 400001',
                items: [
                    { productId: '2', name: 'Butter Chicken', price: 350, quantity: 1 },
                    { productId: '3', name: 'Vegetable Biryani', price: 280, quantity: 1 },
                    { productId: '5', name: 'Masala Chai', price: 80, quantity: 2 }
                ],
                subtotal: 790,
                deliveryFee: 50,
                tax: 39.5,
                total: 879.5,
                status: 'pending',
                date: '2023-06-18T14:45:00',
                paymentMethod: 'online'
            }
        ];
        
        const sampleUsers = [
            {
                id: 'user1',
                name: 'Rahul Sharma',
                email: 'user@example.com',
                password: 'user123', // In a real app, this would be hashed
                phone: '+91 9876543210',
                address: '123 Main St, Mumbai, Maharashtra, 400001',
                isAdmin: false
            },
            {
                id: 'admin1',
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'admin123', // In a real app, this would be hashed
                phone: '+91 9876543211',
                address: '456 Admin St, Delhi, Delhi, 110001',
                isAdmin: true
            }
        ];
        
        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Set up mobile menu toggle
            document.getElementById('mobile-menu-button').addEventListener('click', function() {
                const mobileMenu = document.getElementById('mobile-menu');
                mobileMenu.classList.toggle('hidden');
            });
            
            // Set up search functionality
            const searchInput = document.getElementById('search-products');
            if (searchInput) {
                searchInput.addEventListener('input', function(e) {
                    const searchTerm = e.target.value.toLowerCase();
                    filterProductsBySearch(searchTerm);
                });
            }
            
            // Load sample data
            products = sampleProducts;
            orders = sampleOrders;
            users = sampleUsers;
            
            // Initialize the app
            loadProducts();
            loadFeaturedProducts();
            updateCartCount();
            
            // Show home page by default
            showPage('home');
            
            console.log('Catering Reservation System initialized');
        });
        
        // Helper function to create food SVG
        function createFoodSVG(color, size = '100%') {
            const colors = {
                orange: '#FFA500',
                brown: '#8B4513',
                green: '#228B22',
                yellow: '#FFD700',
                pink: '#FF69B4'
            };
            
            const fillColor = colors[color] || '#FFA500';
            
            return `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">
                    <circle cx="50" cy="50" r="40" fill="${fillColor}" />
                    <circle cx="50" cy="50" r="35" fill="white" opacity="0.3" />
                    <circle cx="30" cy="35" r="5" fill="white" opacity="0.6" />
                </svg>
            `;
        }
        
        // Helper function to get random color
        function getRandomColor() {
            const colors = ['orange', 'brown', 'green', 'yellow', 'pink'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        // Helper function to get category name
        function getCategoryName(category) {
            switch (category) {
                case 'appetizers':
                    return 'Appetizers';
                case 'main-course':
                    return 'Main Course';
                case 'desserts':
                    return 'Desserts';
                case 'beverages':
                    return 'Beverages';
                default:
                    return category;
            }
        }
        
        // Helper function to get category class
        function getCategoryClass(category) {
            switch (category) {
                case 'appetizers':
                    return 'bg-yellow-100 text-yellow-800';
                case 'main-course':
                    return 'bg-red-100 text-red-800';
                case 'desserts':
                    return 'bg-pink-100 text-pink-800';
                case 'beverages':
                    return 'bg-blue-100 text-blue-800';
                default:
                    return 'bg-gray-100 text-gray-800';
            }
        }
        
        // Show toast notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            
            if (!toast || !toastMessage) return;
            
            toastMessage.textContent = message;
            toast.classList.remove('translate-y-20', 'opacity-0');
            
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }
        
        // Show error message
        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            if (!errorElement) return;
            
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            
            // Hide success message if it exists
            const successId = elementId.replace('error', 'success');
            const successElement = document.getElementById(successId);
            if (successElement) {
                successElement.classList.add('hidden');
            }
        }
        
        // Show success message
        function showSuccess(elementId, message) {
            const successElement = document.getElementById(elementId);
            if (!successElement) return;
            
            successElement.textContent = message;
            successElement.classList.remove('hidden');
            
            // Hide error message if it exists
            const errorId = elementId.replace('success', 'error');
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.classList.add('hidden');
            }
        }
        
        // Navigation functions
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.add('hidden');
            });
            
            // Show the selected page
            const selectedPage = document.getElementById(pageId);
            if (selectedPage) {
                selectedPage.classList.remove('hidden');
                currentPage = pageId;
                
                // Special handling for certain pages
                if (pageId === 'cart') {
                    renderCart();
                } else if (pageId === 'products') {
                    loadProducts();
                } else if (pageId === 'orders' && currentUser) {
                    loadUserOrders();
                } else if (pageId === 'admin-dashboard' && isAdmin) {
                    showAdminSection('admin-products');
                    loadAdminProducts();
                } else if (pageId === 'profile' && currentUser) {
                    updateAuthUI();
                }
                
                // Scroll to top
                window.scrollTo(0, 0);
            }
            
            console.log('Page changed to:', pageId);
        }
        
        // Authentication functions
        function loginUser() {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Clear previous messages
            document.getElementById('login-error').classList.add('hidden');
            document.getElementById('login-success').classList.add('hidden');
            
            // Validate inputs
            if (!email || !password) {
                showError('login-error', 'Please enter both email and password');
                return;
            }
            
            // Find user by email
            const user = users.find(u => u.email === email);
            
            if (!user) {
                showError('login-error', 'User not found. Please check your email.');
                return;
            }
            
            // Check password
            if (user.password !== password) {
                showError('login-error', 'Incorrect password. Please try again.');
                return;
            }
            
            // Login successful
            currentUser = user;
            isAdmin = user.isAdmin;
            
            // Show success message
            showSuccess('login-success', 'Login successful! Redirecting...');
            
            // Update UI
            updateAuthUI();
            
            // Redirect after a short delay
            setTimeout(() => {
                if (isAdmin) {
                    showPage('admin-dashboard');
                    showToast('Welcome back, Admin!');
                } else {
                    showPage('home');
                    showToast('Welcome back, ' + user.name + '!');
                }
            }, 1000);
            
            console.log('User logged in:', user.email);
        }
        
        function registerUser() {
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const phone = document.getElementById('register-phone').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const termsChecked = document.getElementById('terms').checked;
            
            // Clear previous messages
            document.getElementById('register-error').classList.add('hidden');
            document.getElementById('register-success').classList.add('hidden');
            
            // Validate inputs
            if (!name || !email || !phone || !password) {
                showError('register-error', 'Please fill in all required fields');
                return;
            }
            
            if (password !== confirmPassword) {
                showError('register-error', 'Passwords do not match');
                return;
            }
            
            if (!termsChecked) {
                showError('register-error', 'Please agree to the terms and conditions');
                return;
            }
            
            // Check if email already exists
            if (users.some(user => user.email === email)) {
                showError('register-error', 'Email already registered. Please use a different email or login.');
                return;
            }
            
            // Create new user
            const newUser = {
                id: 'user' + (users.length + 1),
                name: name,
                email: email,
                password: password,
                phone: phone,
                address: '',
                isAdmin: false
            };
            
            // Add user to users array
            users.push(newUser);
            
            // Show success message
            showSuccess('register-success', 'Registration successful! You can now login.');
            
            // Clear form
            document.getElementById('register-name').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-phone').value = '';
            document.getElementById('register-password').value = '';
            document.getElementById('register-confirm-password').value = '';
            document.getElementById('terms').checked = false;
            
            console.log('User registered:', newUser.email);
            
            // Redirect to login after a short delay
            setTimeout(() => {
                showPage('login');
            }, 2000);
        }
        
        function logout() {
            currentUser = null;
            isAdmin = false;
            updateAuthUI();
            showPage('home');
            showToast('Logged out successfully');
            console.log('User logged out');
        }
        
        function updateAuthUI() {
            const authButtons = document.getElementById('auth-buttons');
            const userInfo = document.getElementById('user-info');
            
            if (currentUser) {
                authButtons.classList.add('hidden');
                userInfo.classList.remove('hidden');
                document.getElementById('user-name').textContent = currentUser.name;
                
                // Update profile page if it exists
                if (document.getElementById('profile-name')) {
                    document.getElementById('profile-name').textContent = currentUser.name;
                    document.getElementById('profile-email').textContent = currentUser.email;
                    document.getElementById('profile-fullname').value = currentUser.name;
                    document.getElementById('profile-phone').value = currentUser.phone;
                    document.getElementById('profile-address').value = currentUser.address || '';
                }
                
                // Load user-specific data
                if (!isAdmin) {
                    loadUserOrders();
                }
            } else {
                authButtons.classList.remove('hidden');
                userInfo.classList.add('hidden');
            }
        }
        
        // Forgot password functions
        function showForgotPassword() {
            document.getElementById('forgot-password-modal').classList.remove('hidden');
            document.getElementById('forgot-email').value = document.getElementById('login-email').value || '';
            document.getElementById('forgot-error').classList.add('hidden');
            document.getElementById('forgot-success').classList.add('hidden');
        }
        
        function hideForgotPassword() {
            document.getElementById('forgot-password-modal').classList.add('hidden');
        }
        
        function resetPassword() {
            const email = document.getElementById('forgot-email').value;
            
            // Clear previous messages
            document.getElementById('forgot-error').classList.add('hidden');
            document.getElementById('forgot-success').classList.add('hidden');
            
            // Validate email
            if (!email) {
                showError('forgot-error', 'Please enter your email address');
                return;
            }
            
            // Check if email exists
            const user = users.find(u => u.email === email);
            
            if (!user) {
                showError('forgot-error', 'No account found with this email address');
                return;
            }
            
            // In a real app, we would send a password reset email
            // For demo purposes, we'll just show a success message
            
            // Show success message
            showSuccess('forgot-success', 'Password reset link sent to your email. Please check your inbox.');
            
            // Close modal after a delay
            setTimeout(() => {
                hideForgotPassword();
            }, 3000);
            
            console.log('Password reset requested for:', email);
        }
        
        // Product functions
        function loadProducts() {
            const container = document.getElementById('products-container');
            if (!container) return;
            
            // Clear container
            container.innerHTML = '';
            
            // Filter active products
            const activeProducts = products.filter(product => product.status === 'active');
            
            if (activeProducts.length === 0) {
                container.innerHTML = '<p class="col-span-3 text-center text-gray-500 py-8">No products available.</p>';
                return;
            }
            
            // Render products
            activeProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden product-card';
                productCard.dataset.category = product.category;
                
                productCard.innerHTML = `
                    <div class="h-48 bg-gray-100 flex items-center justify-center">
                        ${product.image}
                    </div>
                    <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-lg font-semibold">${product.name}</h3>
                            <span class="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">${getCategoryName(product.category)}</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-4">${product.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-bold">₹${product.price.toFixed(2)}</span>
                            <button onclick="addToCart('${product.id}')" class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg transition flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;
                
                container.appendChild(productCard);
            });
        }
        
        function loadFeaturedProducts() {
            const container = document.getElementById('featured-products');
            if (!container) return;
            
            // Clear container
            container.innerHTML = '';
            
            // Get 4 random active products
            const activeProducts = products.filter(product => product.status === 'active');
            const featuredProducts = activeProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
            
            // Render featured products
            featuredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden';
                
                productCard.innerHTML = `
                    <div class="h-40 bg-gray-100 flex items-center justify-center">
                        ${product.image}
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-semibold mb-1">${product.name}</h3>
                        <p class="text-orange-600 font-bold">₹${product.price.toFixed(2)}</p>
                    </div>
                `;
                
                productCard.addEventListener('click', () => {
                    showPage('products');
                });
                
                container.appendChild(productCard);
            });
        }
        
        function filterProducts(category) {
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('bg-orange-500', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            event.target.classList.remove('bg-gray-200', 'text-gray-700');
            event.target.classList.add('bg-orange-500', 'text-white');
            
            // Filter products
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }
        
        function filterProductsBySearch(searchTerm) {
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                const productDescription = card.querySelector('p').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }
        
        // Cart functions
        function addToCart(productId) {
            // Find the product
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            // Check if product is already in cart
            const existingItem = cart.find(item => item.productId === productId);
            
            if (existingItem) {
                // Increment quantity
                existingItem.quantity += 1;
            } else {
                // Add new item to cart
                cart.push({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1
                });
            }
            
            // Update UI
            updateCartCount();
            showToast(`${product.name} added to cart`);
            console.log('Added to cart:', product.name);
        }
        
        function updateCartCount() {
            const cartCount = document.getElementById('cart-count');
            if (!cartCount) return;
            
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            
            if (totalItems > 0) {
                cartCount.textContent = totalItems;
                cartCount.classList.remove('hidden');
            } else {
                cartCount.classList.add('hidden');
            }
        }
        
        function renderCart() {
            const cartItems = document.getElementById('cart-items');
            const emptyCart = document.getElementById('empty-cart');
            const cartSummary = document.getElementById('cart-summary');
            
            if (!cartItems || !emptyCart || !cartSummary) return;
            
            // Clear cart items
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                // Show empty cart message
                emptyCart.classList.remove('hidden');
                cartSummary.classList.add('hidden');
                return;
            }
            
            // Hide empty cart message and show summary
            emptyCart.classList.add('hidden');
            cartSummary.classList.remove('hidden');
            
            // Calculate totals
            const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            const deliveryFee = 50;
            const tax = subtotal * 0.05; // 5% tax
            const total = subtotal + deliveryFee + tax;
            
            // Update summary
            document.getElementById('cart-subtotal').textContent = `₹${subtotal.toFixed(2)}`;
            document.getElementById('cart-tax').textContent = `₹${tax.toFixed(2)}`;
            document.getElementById('cart-total').textContent = `₹${total.toFixed(2)}`;
            
            // Render cart items
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'flex items-center p-4';
                
                cartItem.innerHTML = `
                    <div class="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                        ${createFoodSVG(getRandomColor())}
                    </div>
                    <div class="flex-1">
                        <h3 class="font-medium">${item.name}</h3>
                        <p class="text-gray-600">₹${item.price.toFixed(2)}</p>
                    </div>
                    <div class="flex items-center">
                        <button onclick="updateCartItemQuantity(${index}, ${item.quantity - 1})" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                            </svg>
                        </button>
                        <span class="mx-3 w-6 text-center">${item.quantity}</span>
                        <button onclick="updateCartItemQuantity(${index}, ${item.quantity + 1})" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                    <div class="ml-4 text-right">
                        <p class="font-medium">₹${(item.price * item.quantity).toFixed(2)}</p>
                        <button onclick="removeCartItem(${index})" class="text-red-500 hover:text-red-700 text-sm">Remove</button>
                    </div>
                `;
                
                cartItems.appendChild(cartItem);
            });
        }
        
        function updateCartItemQuantity(index, newQuantity) {
            if (newQuantity <= 0) {
                removeCartItem(index);
                return;
            }
            
            cart[index].quantity = newQuantity;
            updateCartCount();
            renderCart();
        }
        
        function removeCartItem(index) {
            cart.splice(index, 1);
            updateCartCount();
            renderCart();
            showToast('Item removed from cart');
        }
        
        // Checkout functions
        function showCheckout() {
            if (!currentUser) {
                showToast('Please login to continue');
                showPage('login');
                return;
            }
            
            // Calculate total
            const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            const deliveryFee = 50;
            const tax = subtotal * 0.05; // 5% tax
            const total = subtotal + deliveryFee + tax;
            
            // Update checkout modal
            document.getElementById('checkout-total').textContent = `₹${total.toFixed(2)}`;
            document.getElementById('checkout-name').value = currentUser.name;
            document.getElementById('checkout-phone').value = currentUser.phone;
            document.getElementById('checkout-address').value = currentUser.address || '';
            
            // Set default date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.getElementById('checkout-date').value = tomorrow.toISOString().split('T')[0];
            document.getElementById('checkout-time').value = '12:00';
            
            // Show modal
            document.getElementById('checkout-modal').classList.remove('hidden');
        }
        
        function hideCheckout() {
            document.getElementById('checkout-modal').classList.add('hidden');
        }
        
        function placeOrder() {
            if (cart.length === 0) {
                showToast('Your cart is empty');
                return;
            }
            
            // Get form values
            const name = document.getElementById('checkout-name').value;
            const phone = document.getElementById('checkout-phone').value;
            const address = document.getElementById('checkout-address').value;
            const date = document.getElementById('checkout-date').value;
            const time = document.getElementById('checkout-time').value;
            const notes = document.getElementById('checkout-notes').value;
            const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
            
            // Validate inputs
            if (!name || !phone || !address || !date || !time) {
                showToast('Please fill in all required fields');
                return;
            }
            
            // Calculate totals
            const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            const deliveryFee = 50;
            const tax = subtotal * 0.05; // 5% tax
            const total = subtotal + deliveryFee + tax;
            
            // Create order object
            const order = {
                id: 'ORD' + Math.floor(Math.random() * 10000).toString().padStart(3, '0'),
                userId: currentUser.id,
                customerName: name,
                customerPhone: phone,
                customerAddress: address,
                deliveryDate: date,
                deliveryTime: time,
                notes: notes,
                items: [...cart],
                subtotal: subtotal,
                deliveryFee: deliveryFee,
                tax: tax,
                total: total,
                status: 'pending',
                date: new Date().toISOString(),
                paymentMethod: paymentMethod
            };
            
            // Add order to orders array
            orders.push(order);
            
            // Clear cart
            cart = [];
            updateCartCount();
            
            // Hide checkout modal
            hideCheckout();
            
            // Show success message
            showToast('Order placed successfully');
            
            // Redirect to orders page
            showPage('orders');
            
            console.log('Order placed:', order);
        }
        
        // Order functions
        function loadUserOrders() {
            if (!currentUser) return;
            
            const container = document.getElementById('orders-container');
            const noOrders = document.getElementById('no-orders');
            
            if (!container || !noOrders) return;
            
            // Clear container
            container.innerHTML = '';
            
            // Filter user orders
            const userOrders = orders.filter(order => order.userId === currentUser.id);
            
            if (userOrders.length === 0) {
                // Show no orders message
                noOrders.classList.remove('hidden');
                return;
            }
            
            // Hide no orders message
            noOrders.classList.add('hidden');
            
            // Sort orders by date (newest first)
            userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Render orders
            userOrders.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.className = 'bg-white rounded-lg shadow-md overflow-hidden';
                
                // Format date
                const orderDate = new Date(order.date);
                const formattedDate = orderDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                // Get status class
                let statusClass = '';
                switch (order.status) {
                    case 'pending':
                        statusClass = 'bg-yellow-100 text-yellow-800';
                        break;
                    case 'processing':
                        statusClass = 'bg-blue-100 text-blue-800';
                        break;
                    case 'delivered':
                        statusClass = 'bg-green-100 text-green-800';
                        break;
                    case 'cancelled':
                        statusClass = 'bg-red-100 text-red-800';
                        break;
                }
                
                orderCard.innerHTML = `
                    <div class="p-4 border-b">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-sm text-gray-600">Order ID</p>
                                <p class="font-medium">${order.id}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Date</p>
                                <p class="font-medium">${formattedDate}</p>
                            </div>
                            <div>
                                <span class="px-2 py-1 rounded-full text-xs font-medium ${statusClass}">
                                    ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="p-4">
                        <div class="mb-4">
                            <h3 class="font-medium mb-2">Items</h3>
                            <ul class="space-y-2">
                                ${order.items.map(item => `
                                    <li class="flex justify-between">
                                        <span>${item.quantity} x ${item.name}</span>
                                        <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="border-t pt-4 flex justify-between items-center">
                            <div>
                                <p class="text-gray-600">Total</p>
                                <p class="text-lg font-bold">₹${order.total.toFixed(2)}</p>
                            </div>
                            <button onclick="viewOrderDetails('${order.id}', false)" class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition">
                                View Details
                            </button>
                        </div>
                    </div>
                `;
                
                container.appendChild(orderCard);
            });
        }
        
        // Profile functions
        function updateProfile() {
            if (!currentUser) return;
            
            const name = document.getElementById('profile-fullname').value;
            const phone = document.getElementById('profile-phone').value;
            const address = document.getElementById('profile-address').value;
            
            // Update user data
            currentUser.name = name;
            currentUser.phone = phone;
            currentUser.address = address;
            
            // Update UI
            document.getElementById('profile-name').textContent = name;
            document.getElementById('user-name').textContent = name;
            
            showToast('Profile updated successfully');
        }
        
        function changePassword() {
            const currentPassword = document.getElementById('profile-current-password').value;
            const newPassword = document.getElementById('profile-new-password').value;
            const confirmPassword = document.getElementById('profile-confirm-password').value;
            
            if (!currentPassword || !newPassword || !confirmPassword) {
                showToast('Please fill in all password fields');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showToast('New passwords do not match');
                return;
            }
            
            // Check current password
            if (currentUser.password !== currentPassword) {
                showToast('Current password is incorrect');
                return;
            }
            
            // Update password
            currentUser.password = newPassword;
            
            // Clear password fields
            document.getElementById('profile-current-password').value = '';
            document.getElementById('profile-new-password').value = '';
            document.getElementById('profile-confirm-password').value = '';
            
            showToast('Password changed successfully');
        }
        
        // Admin functions
        function showAdminSection(sectionId) {
            // Hide all admin sections
            document.querySelectorAll('.admin-section').forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show the selected section
            const selectedSection = document.getElementById(sectionId);
            if (selectedSection) {
                selectedSection.classList.remove('hidden');
            }
            
            // Update active nav button
            document.querySelectorAll('.admin-nav-btn').forEach(btn => {
                btn.classList.remove('bg-orange-100', 'text-orange-700');
                btn.classList.add('text-gray-700');
            });
            
            const activeBtn = document.querySelector(`.admin-nav-btn[onclick="showAdminSection('${sectionId}')"]`);
            if (activeBtn) {
                activeBtn.classList.remove('text-gray-700');
                activeBtn.classList.add('bg-orange-100', 'text-orange-700');
            }
            
            // Load section data
            if (sectionId === 'admin-products') {
                loadAdminProducts();
            } else if (sectionId === 'admin-orders') {
                loadAdminOrders();
            } else if (sectionId === 'admin-users') {
                loadAdminUsers();
            }
        }
        
        function loadAdminProducts() {
            const tableBody = document.getElementById('admin-products-table');
            if (!tableBody) return;
            
            // Clear table
            tableBody.innerHTML = '';
            
            // Render products
            products.forEach(product => {
                const row = document.createElement('tr');
                
                const statusClass = product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
                
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                ${createFoodSVG(getRandomColor(), '24px')}
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${product.name}</div>
                                <div class="text-sm text-gray-500">${product.description.substring(0, 50)}${product.description.length > 50 ? '...' : ''}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryClass(product.category)}">
                            ${getCategoryName(product.category)}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹${product.price.toFixed(2)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
                            ${product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onclick="editProduct('${product.id}')" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button onclick="toggleProductStatus('${product.id}')" class="text-${product.status === 'active' ? 'red' : 'green'}-600 hover:text-${product.status === 'active' ? 'red' : 'green'}-900">
                            ${product.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
        }
        
        function loadAdminOrders() {
            const tableBody = document.getElementById('admin-orders-table');
            if (!tableBody) return;
            
            // Clear table
            tableBody.innerHTML = '';
            
            // Sort orders by date (newest first)
            const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Render orders
            sortedOrders.forEach(order => {
                const row = document.createElement('tr');
                
                // Format date
                const orderDate = new Date(order.date);
                const formattedDate = orderDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                
                // Get status class
                let statusClass = '';
                switch (order.status) {
                    case 'pending':
                        statusClass = 'bg-yellow-100 text-yellow-800';
                        break;
                    case 'processing':
                        statusClass = 'bg-blue-100 text-blue-800';
                        break;
                    case 'delivered':
                        statusClass = 'bg-green-100 text-green-800';
                        break;
                    case 'cancelled':
                        statusClass = 'bg-red-100 text-red-800';
                        break;
                }
                
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${order.id}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.customerName}<br>
                        <span class="text-xs">${order.customerPhone}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${formattedDate}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹${order.total.toFixed(2)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
                            ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onclick="viewOrderDetails('${order.id}', true)" class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                        <button onclick="updateOrderStatus('${order.id}')" class="text-orange-600 hover:text-orange-900">Update</button>
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
        }
        
        function loadAdminUsers() {
            const tableBody = document.getElementById('admin-users-table');
            if (!tableBody) return;
            
            // Clear table
            tableBody.innerHTML = '';
            
            // Render users
            users.forEach(user => {
                const row = document.createElement('tr');
                
                // Count user orders
                const userOrders = orders.filter(order => order.userId === user.id).length;
                
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${user.name}</div>
                                <div class="text-xs text-gray-500">${user.isAdmin ? 'Admin' : 'Customer'}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${user.email}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${user.phone}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${userOrders}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onclick="viewUserDetails('${user.id}')" class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                        ${!user.isAdmin ? `<button onclick="toggleUserStatus('${user.id}')" class="text-red-600 hover:text-red-900">Disable</button>` : ''}
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
        }
        
        function filterAdminOrders(status) {
            // Update active filter button
            document.querySelectorAll('.admin-order-filter').forEach(btn => {
                btn.classList.remove('bg-orange-500', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            event.target.classList.remove('bg-gray-200', 'text-gray-700');
            event.target.classList.add('bg-orange-500', 'text-white');
            
            // Filter orders
            const tableBody = document.getElementById('admin-orders-table');
            if (!tableBody) return;
            
            // Clear table
            tableBody.innerHTML = '';
            
            // Filter and sort orders
            let filteredOrders = [...orders];
            if (status !== 'all') {
                filteredOrders = filteredOrders.filter(order => order.status === status);
            }
            filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Render filtered orders
            filteredOrders.forEach(order => {
                // (Same rendering code as in loadAdminOrders)
                const row = document.createElement('tr');
                
                // Format date
                const orderDate = new Date(order.date);
                const formattedDate = orderDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                
                // Get status class
                let statusClass = '';
                switch (order.status) {
                    case 'pending':
                        statusClass = 'bg-yellow-100 text-yellow-800';
                        break;
                    case 'processing':
                        statusClass = 'bg-blue-100 text-blue-800';
                        break;
                    case 'delivered':
                        statusClass = 'bg-green-100 text-green-800';
                        break;
                    case 'cancelled':
                        statusClass = 'bg-red-100 text-red-800';
                        break;
                }
                
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${order.id}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.customerName}<br>
                        <span class="text-xs">${order.customerPhone}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${formattedDate}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹${order.total.toFixed(2)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
                            ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onclick="viewOrderDetails('${order.id}', true)" class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                        <button onclick="updateOrderStatus('${order.id}')" class="text-orange-600 hover:text-orange-900">Update</button>
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
        }


        (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'96779fc190867e55',t:'MTc1MzkwNzUzMy4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();