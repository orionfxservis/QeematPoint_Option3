// Language Toggle Logic
    const currentLang = localStorage.getItem('qeematLang') || 'ur';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ur' ? 'rtl' : 'ltr';

    document.addEventListener('DOMContentLoaded', () => {
      const toggleBtn = document.getElementById('langToggleBtn');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          const newLang = document.documentElement.lang === 'ur' ? 'en' : 'ur';
          document.documentElement.lang = newLang;
          document.documentElement.dir = newLang === 'ur' ? 'rtl' : 'ltr';
          localStorage.setItem('qeematLang', newLang);
        });
      }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }

    // Login Dropdown toggle
    const loginToggleBtn = document.getElementById('loginToggleBtn');
    const loginDropdown = document.getElementById('loginDropdown');
    const loginTabUser = document.getElementById('loginTabUser');
    const loginTabAdmin = document.getElementById('loginTabAdmin');
    const loginInputUserName = document.getElementById('loginInputUserName');
    const loginInputCompany = document.getElementById('loginInputCompany');
    const loginInputUserId = document.getElementById('loginInputUserId');
    const loginInputPassword = document.getElementById('loginInputPassword');
    const loginSubmitBtn = document.getElementById('loginSubmitBtn');
    let currentLoginMode = 'user';

    if (loginToggleBtn && loginDropdown) {
      loginToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        loginDropdown.classList.toggle('hidden');
      });
      loginDropdown.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent closing when clicking inside
      });
      document.addEventListener('click', () => {
        loginDropdown.classList.add('hidden');
      });
    }

    if (loginTabUser && loginTabAdmin && loginInputUserName && loginInputCompany) {
      // Toggle to User mode
      loginTabUser.addEventListener('click', () => {
        currentLoginMode = 'user';
        // Update Buttons
        loginTabUser.className = "flex-[1.2] pb-2 text-emerald-400 border-b-2 border-emerald-400 font-semibold text-sm";
        loginTabAdmin.className = "flex-[1] pb-2 text-slate-400 font-medium text-sm hover:text-slate-200 border-b-2 border-transparent";
        // Show user specific fields
        loginInputUserName.classList.remove('hidden');
        loginInputCompany.classList.remove('hidden');
      });

      // Toggle to Admin mode
      loginTabAdmin.addEventListener('click', () => {
        currentLoginMode = 'admin';
        // Update Buttons
        loginTabAdmin.className = "flex-[1] pb-2 text-emerald-400 border-b-2 border-emerald-400 font-semibold text-sm";
        loginTabUser.className = "flex-[1.2] pb-2 text-slate-400 font-medium text-sm hover:text-slate-200 border-b-2 border-transparent";
        // Hide user specific fields
        loginInputUserName.classList.add('hidden');
        loginInputCompany.classList.add('hidden');
      });
    }

    if (loginSubmitBtn) {
      loginSubmitBtn.addEventListener('click', () => {
        if (currentLoginMode === 'admin') {
          const userId = loginInputUserId.value.trim();
          const pass = loginInputPassword.value;
          
          const isFaisal = userId.toLowerCase() === 'faisal' && pass === '1234';
          const isAshraf = userId.toLowerCase() === 'ashraf taj' && pass === '1234';
          
          if (isFaisal || isAshraf) {
            // Check if we are currently inside the 'pages' directory
            const isInPages = window.location.pathname.includes('/pages/');
            const adminPath = isInPages ? 'admin.html' : 'pages/admin.html';
            window.location.href = adminPath;
          } else {
            alert('Invalid Admin credentials!');
          }
        } else {
          alert('User login successful (demo)');
          loginDropdown.classList.add('hidden');
        }
      });
    }

    // Category dropdown
    const categoryToggle = document.getElementById('categoryToggle');
    const categoryMenu = document.getElementById('categoryMenu');
    const categoryLabel = document.getElementById('categoryLabel');
    let currentCategory = 'all';

    if (categoryToggle) {
      categoryToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        categoryMenu.classList.toggle('hidden');
      });
      document.addEventListener('click', () => {
        categoryMenu.classList.add('hidden');
      });
      categoryMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        const btn = e.target.closest('button[data-category]');
        if (!btn) return;
        currentCategory = btn.getAttribute('data-category');
        
        if (currentCategory === 'food') {
          window.location.href = 'pages/food.html';
          return;
        }

        categoryLabel.textContent = btn.textContent.trim();
        categoryMenu.classList.add('hidden');
        renderProducts();
      });
    }

    // Demo products data
    const products = [
      { name: 'Sugar 1kg / چینی 1 کلو', category: 'grocery', city: 'Karachi', area: 'Gulshan-e-Iqbal', distanceKm: 1.2, price: 155 },
      { name: 'Sugar 1kg / چینی 1 کلو', category: 'grocery', city: 'Karachi', area: 'Bahadurabad', distanceKm: 3.1, price: 150 },
      { name: 'Sugar 1kg / چینی 1 کلو', category: 'grocery', city: 'Karachi', area: 'Nazimabad', distanceKm: 4.2, price: 148 },
      { name: 'Milk 1L Pack / دودھ 1 لیٹر', category: 'grocery', city: 'Lahore', area: 'Model Town', distanceKm: 0.8, price: 235 },
      { name: 'Milk 1L Pack / دودھ 1 لیٹر', category: 'grocery', city: 'Lahore', area: 'Johar Town', distanceKm: 2.4, price: 230 },
      { name: 'Tomato 1kg / ٹماٹر 1 کلو', category: 'vegetables', city: 'Karachi', area: 'Saddar', distanceKm: 2.0, price: 95 },
      { name: 'Potato 1kg / آلو 1 کلو', category: 'vegetables', city: 'Karachi', area: 'Gulshan-e-Iqbal', distanceKm: 1.2, price: 75 },
      { name: 'Chicken 1kg / چکن 1 کلو', category: 'meat', city: 'Lahore', area: 'Township', distanceKm: 1.5, price: 495 },
      { name: 'Beef 1kg / بیف 1 کلو', category: 'meat', city: 'Karachi', area: 'Liaquatabad', distanceKm: 3.7, price: 780 },
      { name: 'Cooking Oil 1L / کوکنگ آئل 1 لیٹر', category: 'grocery', city: 'Karachi', area: 'Defence', distanceKm: 5.2, price: 540 },
      { name: 'Smartphone 6.5" 128GB / سمارٹ فون', category: 'electronics', city: 'Karachi', area: 'Saddar Mobile Market', distanceKm: 6.0, price: 46500 },
      { name: 'Smartphone 6.5" 128GB / سمارٹ فون', category: 'electronics', city: 'Lahore', area: 'Hall Road', distanceKm: 4.5, price: 45990 },
      { name: 'Shampoo 340ml / شیمپو 340ml', category: 'personal', city: 'Karachi', area: 'Gulistan-e-Johar', distanceKm: 2.8, price: 430 },
      { name: 'Washing Powder 2kg / واشنگ پاؤڈر 2 کلو', category: 'grocery', city: 'Lahore', area: 'DHA', distanceKm: 5.0, price: 880 }
    ];

    const productRowsEl = document.getElementById('productRows');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function distanceBadge(km) {
      if (km <= 1.5) return '<span class="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[0.6rem]">Near</span>';
      if (km <= 3.5) return '<span class="px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 text-[0.6rem]">Medium</span>';
      return '<span class="px-1.5 py-0.5 rounded-full bg-slate-700/70 text-slate-200 text-[0.6rem]">Far</span>';
    }

    function renderProducts() {
      if (!productRowsEl) return;
      const q = searchInput.value.trim().toLowerCase();
      let filtered = products.slice();

      if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
      }
      if (q) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
      }

      // sort by distance first, then price
      filtered.sort((a, b) => {
        if (a.distanceKm === b.distanceKm) return a.price - b.price;
        return a.distanceKm - b.distanceKm;
      });

      productRowsEl.innerHTML = filtered.map(p => `
        <div class="product-row grid grid-cols-12 px-2 sm:px-3 py-2 text-[0.7rem] sm:text-xs">
          <div class="col-span-5 flex flex-col">
            <span class="text-slate-100"><span class="lang-en">${p.name.split(' / ')[0]}</span><span class="lang-ur">${p.name.split(' / ')[1] || p.name}</span></span>
            <span class="text-slate-500">${p.city}</span>
          </div>
          <div class="col-span-3 flex flex-col text-center">
            <span class="text-slate-200">${p.area}</span>
          </div>
          <div class="col-span-2 flex flex-col items-center">
            <span class="text-slate-200">${p.distanceKm.toFixed(1)} km</span>
            ${distanceBadge(p.distanceKm)}
          </div>
          <div class="col-span-2 flex flex-col text-right">
            <span class="text-emerald-400 font-semibold">Rs ${p.price.toLocaleString()}</span>
          </div>
        </div>
      `).join('') || `
        <div class="px-3 py-4 text-center text-[0.75rem] text-slate-500">
          <span class="lang-en">No items found for your search</span><span class="lang-ur">Ø§Ø¨Ú¾ÛŒ Ø§Ø³ ØªÙ„Ø§Ø´ Ú©Û’ Ù„ÛŒÛ’ ÚˆÛŒÙ¹Ø§ Ù…ÙˆØ¬ÙˆØ¯ Ù†ÛÛŒÚº</span>
        </div>
      `;
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        const q = searchInput.value.trim().toLowerCase();
        const foodKeywords = ['burger', 'pizza', 'food', 'zinger', 'broast', 'haleem', 'fast food', 'fries', 'desi', 'karahi', 'biryani'];
        if (foodKeywords.some(kw => q.includes(kw))) {
          window.location.href = `pages/food.html?search=${encodeURIComponent(searchInput.value.trim())}`;
          return;
        }
        renderProducts();
      });
    }
    if (searchInput) {
      searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          const q = searchInput.value.trim().toLowerCase();
          const foodKeywords = ['burger', 'pizza', 'food', 'zinger', 'broast', 'haleem', 'fast food', 'fries', 'desi', 'karahi', 'biryani'];
          if (foodKeywords.some(kw => q.includes(kw))) {
            window.location.href = `pages/food.html?search=${encodeURIComponent(searchInput.value.trim())}`;
            return;
          }
          renderProducts();
        }
      });
    }

    // Initial render
    renderProducts();

    // Dynamic year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Check User Location on Load
    function checkUserLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log("User location detected:", lat, lon);
            
            const btn = document.getElementById('headerLocationBtn');
            if (btn) {
              btn.innerHTML = '\uD83D\uDCCD Location Active';
              btn.className = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-md transition';
            }
            // In a real app, send these coordinates to your backend
            // or use reverse-geocoding to set the user's city/area.
          },
          (error) => {
            console.warn("Location access denied or unavailable:", error.message);
            const btn = document.getElementById('headerLocationBtn');
            if (btn) {
              btn.innerHTML = '\uD83C\uDDF5\uD83C\uDDF0 Default View';
              btn.className = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-400 shadow-md transition';
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        console.warn("Geolocation is not supported by this browser.");
      }
    }

    // Request location when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkUserLocation);
    } else {
      checkUserLocation();
    }

    // Balloons generation
    const balloonLayer = document.querySelector('.balloon-layer');
    const commodityIcons = ['\uD83C\uDF45', '\uD83E\uDD54', '\uD83C\uDF57', '\uD83E\uDD5B', '\uD83C\uDF5A', '\uD83D\uDCF1', '\uD83E\uDDF4', '\uD83E\uDDFC', '\uD83E\uDD66', '\uD83C\uDF4A', '\uD83E\uDD69', '\uD83D\uDEE2\uFE0F'];

    function createBalloon() {
      if (!balloonLayer) return;
      const b = document.createElement('div');
      b.className = 'balloon';
      const icon = document.createElement('div');
      icon.className = 'balloon-icon';
      icon.textContent = commodityIcons[Math.floor(Math.random() * commodityIcons.length)];
      b.style.left = Math.random() * 100 + 'vw';
      const duration = 12 + Math.random() * 8;
      b.style.animationDuration = duration + 's';
      balloonLayer.appendChild(b);
      b.appendChild(icon);

      // Blow near top
      const blowTime = (duration - 1.2) * 1000;
      const timer = setTimeout(() => {
        b.classList.add('blow');
      }, blowTime);

      b.addEventListener('animationend', () => {
        clearTimeout(timer);
        b.remove();
      });
    }

    // Initial balloons
    for (let i = 0; i < 8; i++) {
      setTimeout(createBalloon, i * 1200);
    }
    // Continuous balloons
    setInterval(createBalloon, 2800);

    // Active Navigation Link Highlight on Scroll
    const navLinks = document.querySelectorAll('.nav-link');
    const targetIDs = Array.from(navLinks).map(link => link.getAttribute('href')).filter(href => href && href.startsWith('#'));
    // Deduplicate IDs in case desktop and mobile menus share them
    const uniqueIDs = [...new Set(targetIDs)];
    const targetElements = uniqueIDs.map(id => document.querySelector(id)).filter(el => el);

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      let current = '';

      targetElements.forEach((el) => {
        // get offsetTop of the element from the document body
        let top = el.offsetTop;
        let parent = el.offsetParent;
        while(parent) {
          top += parent.offsetTop;
          parent = parent.offsetParent;
        }
        
        top = top - 120; // adjust for sticky header height + padding
        const height = el.offsetHeight;
        
        if (scrollY >= top && scrollY < top + height) {
          current = el.getAttribute('id');
        }
      });

      // Special case for reaching the bottom of the page
      if ((window.innerHeight + scrollY) >= document.body.offsetHeight - 50) {
        if (targetElements.length > 0) {
          const lastEl = targetElements[targetElements.length - 1];

          current = lastEl ? lastEl.getAttribute('id') : '';
        }
      }

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

// Dynamic Add-ons (Categories & Banners)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Categories Mapping
    const catGrid = document.getElementById('dynamicCategoryGrid');
    const topPills = document.getElementById('dynamicTopPills');
    if ((catGrid || topPills) && typeof DataService !== 'undefined') {
        DataService.getCategories().then(categories => {
            if (categories && categories.length > 0) {
                const visibleCategories = categories.filter(cat => cat.showOnMainPage !== false);
                const iconMap = {
                    'food': '\uD83C\uDF54',
                    'vehicle': '\uD83D\uDE97',
                    'vehicles': '\uD83D\uDE97',
                    'grocery': '\uD83D\uDED2',
                    'fruits': '🥦',
                    'fruit': '🥦',
                    'electronics': '\uD83D\uDCF1',
                    'mobile': '\uD83D\uDCF1',
                    'mobiles': '\uD83D\uDCF1',
                    'clothing': '\uD83D\uDC55',
                    'housing': '\uD83C\uDFE0',
                    'home': '\uD83C\uDFE0',
                    'properties': '\uD83C\uDFE0',
                    'property': '\uD83C\uDFE0',
                    'personal care': '🧴',
                    'kids': '🧸'
                };
                // if (catGrid) {
                //     catGrid.innerHTML = visibleCategories.map(cat => {
                //         const icon = iconMap[cat.name.toLowerCase()] || '📦';
                //         const link = cat.name.toLowerCase() === 'food' ? 'pages/food.html' : 'javascript:void(0)';
                //         return `
                //         <article class="glass-card p-4 hover:-translate-y-1 transition transform" style="cursor: pointer;" onclick="window.location.href='${link}'">
                //             <div class="flex items-center justify-between mb-2">
                //                 <div class="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-xl">${icon}</div>
                //             </div>
                //             <h3 class="font-semibold mb-1 text-slate-50">${cat.name}</h3>
                //             <button class="text-xs font-semibold text-emerald-300 hover:text-emerald-200 mt-2 flex items-center gap-1">
                //                 Explore / دیکھیں <span>→</span>
                //             </button>
                //         </article>
                //     `}).join('');
                // }

                if (topPills) {
                    const topStyles = [
                        { bg: 'bg-yellow-500', text: 'text-yellow-950', shadow: 'shadow-yellow-500/30', hover: 'hover:bg-yellow-400' },
                        { bg: 'bg-rose-500', text: 'text-white', shadow: 'shadow-rose-500/30', hover: 'hover:bg-rose-400' },
                        { bg: 'bg-emerald-500', text: 'text-emerald-950', shadow: 'shadow-emerald-500/30', hover: 'hover:bg-emerald-400' },
                        { bg: 'bg-orange-500', text: 'text-white', shadow: 'shadow-orange-500/30', hover: 'hover:bg-orange-400' },
                        { bg: 'bg-sky-500', text: 'text-sky-950', shadow: 'shadow-sky-500/30', hover: 'hover:bg-sky-400' },
                        { bg: 'bg-indigo-500', text: 'text-white', shadow: 'shadow-indigo-500/30', hover: 'hover:bg-indigo-400' },
                        { bg: 'bg-fuchsia-500', text: 'text-white', shadow: 'shadow-fuchsia-500/30', hover: 'hover:bg-fuchsia-400' },
                        { bg: 'bg-teal-500', text: 'text-teal-950', shadow: 'shadow-teal-500/30', hover: 'hover:bg-teal-400' }
                    ];
                    
                    topPills.innerHTML = visibleCategories.map((cat, idx) => {
                        const icon = iconMap[cat.name.toLowerCase()] || '\uD83D\uDCE6';
                        const link = cat.name.toLowerCase() === 'food' ? 'pages/food.html' : 'javascript:void(0)';
                        const styleArgs = topStyles[idx % topStyles.length];
                        const className = `shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${styleArgs.bg} ${styleArgs.text} shadow-md ${styleArgs.shadow} ${styleArgs.hover} transition`;
                        
                        if (link !== 'javascript:void(0)') {
                            return `<a href="${link}" class="${className}">${icon} ${cat.name}</a>`;
                        } else {
                            return `<button class="${className}">${icon} ${cat.name}</button>`;
                        }
                    }).join('');
                }
            }
        }).catch(e => {
            console.error("Failed to map dynamic categories", e);
        });
    }

    // 2. Dynamic Banner Rotation
    const adBanner = document.getElementById('dynamicHorizontalBanner');
    const vertBanner = document.getElementById('dynamicVerticalBanner');

    if (typeof DataService !== 'undefined') {
        DataService.getBanners().then(allBannersRaw => {
            if (allBannersRaw && allBannersRaw.length > 0) {
                // Unpack type from link if the backend dropped it
                const allBanners = allBannersRaw.map(b => {
                    let displayType = b.type;
                    let displayLink = b.link;
                    if (displayLink && typeof displayLink === 'string' && displayLink.includes('|')) {
                        const parts = displayLink.split('|');
                        if (parts[0] === 'vertical' || parts[0] === 'horizontal') {
                            displayType = parts[0];
                            displayLink = parts.slice(1).join('|');
                        }
                    }
                    return { ...b, type: displayType, link: displayLink };
                });

                // Separate by type, default to horizontal if missing
                const horizBanners = allBanners.filter(b => !b.type || b.type === 'horizontal');
                const vertBanners = allBanners.filter(b => b.type === 'vertical');

                // Render Horizontal Banners
                if (adBanner && horizBanners.length > 0) {
                    adBanner.style.padding = '0';
                    adBanner.style.display = 'block';
                    adBanner.style.background = 'transparent';
                    adBanner.style.border = 'none';
                    adBanner.style.color = 'transparent';
                    adBanner.style.overflow = 'hidden';
                    adBanner.setAttribute('dir', 'ltr');
                    
                    const bannersToShow = horizBanners.slice(0, 4);
                    
                    if (bannersToShow.length === 1) {
                        const b = bannersToShow[0];
                        const clickTarget = b.link ? b.link : 'javascript:void(0)';
                        const cursor = b.link ? 'pointer' : 'default';
                        adBanner.innerHTML = `
                          <a href="${clickTarget}" style="display:block; width:100%; height:100%; overflow:hidden; border-radius: 1rem; cursor: ${cursor}; text-decoration: none;">
                             <img src="${b.image}" alt="Promotional Banner" style="width:100%; height:100%; object-fit: fill; border-radius: 1rem; transition: opacity 0.5s ease;" onerror="this.src='https://picsum.photos/720/120'"/>
                          </a>
                        `;
                    } else {
                        const numBanners = bannersToShow.length;
                        const trackWidth = numBanners * 2 * 100;
                        const itemWidth = 100 / (numBanners * 2);

                        const generateHorizontalHTML = () => {
                            return bannersToShow.map(b => {
                                const clickTarget = b.link ? b.link : 'javascript:void(0)';
                                const cursor = b.link ? 'pointer' : 'default';
                                return `
                                  <div style="width: ${itemWidth}%; height: 100%; flex-shrink: 0; padding-right: 8px; box-sizing: border-box;">
                                    <a href="${clickTarget}" style="display:block; width:100%; height:100%; overflow:hidden; border-radius: 1rem; cursor: ${cursor}; text-decoration: none;">
                                       <img src="${b.image}" alt="Promotional Banner" style="width:100%; height:100%; object-fit: fill; border-radius: 1rem;" onerror="this.src='https://picsum.photos/720/120'"/>
                                    </a>
                                  </div>
                                `;
                            }).join('');
                        };

                        adBanner.innerHTML = `
                          <style>
                            @keyframes horizontalLoopAnim {
                              0% { transform: translateX(0); }
                              100% { transform: translateX(-50%); }
                            }
                            .banner-horizontal-track {
                              display: flex;
                              direction: ltr;
                              height: 100%;
                              width: ${trackWidth}%;
                              animation: horizontalLoopAnim ${numBanners * 6}s linear infinite;
                              will-change: transform;
                            }
                            .banner-horizontal-track:hover {
                              animation-play-state: paused;
                            }
                          </style>
                          <div class="banner-horizontal-track">
                            ${generateHorizontalHTML()}
                            ${generateHorizontalHTML()}
                          </div>
                        `;
                    }
                }

                // Render Vertical Banners
                if (vertBanner && vertBanners.length > 0) {
                    const generateVerticalHTML = () => {
                        return vertBanners.map((b, i) => {
                            const clickTarget = b.link ? b.link : 'javascript:void(0)';
                            const cursor = b.link ? 'pointer' : 'default';
                            // We use .banner-item styling, overriding background
                            return `
                              <div class="banner-item" style="padding:0; background:transparent; display:block; flex-shrink:0;">
                                <a href="${clickTarget}" style="display:block; width:100%; height:100%; cursor:${cursor}; text-decoration:none;">
                                  <img src="${b.image}" alt="Vertical Ad" style="width:100%; height:100%; object-fit:fill;" onerror="this.src='https://picsum.photos/120/180'"/>
                                </a>
                              </div>
                            `;
                        }).join('');
                    };

                    // We need the first half of the track to be at least 720px tall (the container height)
                    // Each banner is 180px tall, so a full set is vertBanners.length * 180
                    const setHeight = vertBanners.length * 180;
                    const setsNeededForHalf = Math.max(1, Math.ceil(720 / setHeight));
                    
                    let singleHalfHTML = '';
                    for (let i = 0; i < setsNeededForHalf; i++) {
                        singleHalfHTML += generateVerticalHTML();
                    }

                    // For seamless scrolling (translateY(-50%)), we duplicate the exact half
                    vertBanner.innerHTML = singleHalfHTML + singleHalfHTML;
                } else if (vertBanner) {
                    // Fallback dummy content if no vertical banners yet
                    const fallbackHTML = `
                      <div class="banner-item">120 × 720<br />Vertical Ad — Grocery Chains</div>
                      <div class="banner-item">Mobile Brands • Electronics Retailers</div>
                      <div class="banner-item">Bank Offers • Credit / Debit Cards</div>
                      <div class="banner-item">Utility Stores • Wholesale Markets</div>
                    `;
                    vertBanner.innerHTML = fallbackHTML + fallbackHTML;
                }
            }
        }).catch(e => {
            console.error("Failed to map banners", e);
        });
    }

    // --- Dynamic Blog Injection ---
    if (document.getElementById('dynamicBlogGrid')) {
        DataService.getBlogs().then(blogs => {
            const container = document.getElementById('dynamicBlogGrid');
            if (blogs && blogs.length > 0) {
                // Determine text direction/language based on current setting (lang-en or lang-ur)
                const htmlStr = blogs.map(b => {
                    // Assuming blog data holds: image, titleEn, titleUr, contentEn, contentUr, author
                    const safeObj = encodeURIComponent(JSON.stringify(b));
                    return `
                      <article class="glass-card p-0 overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/80 transition flex flex-col">
                        <div class="w-full aspect-video">
                          <img src="${b.image}" alt="Blog Image" class="w-full h-full object-cover">
                        </div>
                        <div class="p-4 flex-1 flex flex-col">
                            <p class="text-[0.65rem] text-sky-300 mb-1">
                                <span class="lang-en">${b.categoryEn || 'Uncategorized'}</span>
                                <span class="lang-ur">${b.categoryUr || 'غیر درجہ بند'}</span>
                            </p>
                            <h3 class="font-semibold text-sm text-slate-50 mb-1">
                                <span class="lang-en">${b.titleEn}</span><span class="lang-ur">${b.titleUr}</span>
                            </h3>
                            <p class="text-[0.7rem] text-slate-400 mb-2">
                                <span class="lang-en">${b.descEn || ''}</span><span class="lang-ur">${b.descUr || ''}</span>
                            </p>
                            <button onclick="openBlogModal('${safeObj}')" class="mt-auto self-start text-[0.7rem] text-sky-300 hover:text-sky-200">
                                <span class="lang-en">Read More &rarr;</span><span class="lang-ur">مزید پڑھیں &larr;</span>
                            </button>
                        </div>
                      </article>
                    `;
                }).join('');
                container.innerHTML = htmlStr;
            } else {
                container.innerHTML = `
                    <p class="text-slate-500 col-span-full text-center py-4">
                        <span class="lang-en">No blogs available at the moment.</span><span class="lang-ur">فی الحال کوئی بلاگ دستیاب نہیں ہے۔</span>
                    </p>`;
            }
        }).catch(e => {
            console.error("Failed to load blogs", e);
        });
    }
});

// --- Blog Modal Functions ---
window.openBlogModal = function(safeObj) {
    const blogData = JSON.parse(decodeURIComponent(safeObj));
    const modal = document.getElementById('blogModal');
    
    document.getElementById('modalBlogImage').src = blogData.image;
    
    // Switch title and content based on current language
    const currentLang = document.documentElement.lang || 'en';
    if (currentLang === 'ur') {
        document.getElementById('modalBlogTitle').textContent = blogData.titleUr;
        document.getElementById('modalBlogContent').textContent = blogData.contentUr;
        document.getElementById('modalBlogContent').setAttribute('dir', 'rtl');
        document.getElementById('modalBlogTitle').setAttribute('dir', 'rtl');
    } else {
        document.getElementById('modalBlogTitle').textContent = blogData.titleEn;
        document.getElementById('modalBlogContent').textContent = blogData.contentEn;
        document.getElementById('modalBlogContent').setAttribute('dir', 'ltr');
        document.getElementById('modalBlogTitle').setAttribute('dir', 'ltr');
    }

    document.getElementById('modalBlogAuthor').textContent = blogData.author;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

window.closeBlogModal = function() {
    const modal = document.getElementById('blogModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore background scrolling
};

// Close modal when clicking outside the content area
document.addEventListener('click', function(e) {
    const modal = document.getElementById('blogModal');
    if (modal && !modal.classList.contains('hidden')) {
        // If the click is exactly on the background overlay, close it
        if (e.target === modal) {
            closeBlogModal();
        }
    }
});
