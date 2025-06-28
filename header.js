// الهيدر المحسن الموحد
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const header = document.querySelector('.modern-header');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('show');
      
      // تحريك الأشرطة في زر القائمة
      const bars = menuToggle.querySelectorAll('.bar');
      bars.forEach((bar, index) => {
        if (mobileMenu.classList.contains('show')) {
          if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
          if (index === 1) bar.style.opacity = '0';
          if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
          bar.style.transform = 'none';
          bar.style.opacity = '1';
        }
      });
    });
    
    // إغلاق القائمة عند النقر على أي رابط
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('show');
        const bars = menuToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
          bar.style.transform = 'none';
          bar.style.opacity = '1';
        });
      });
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(event) {
      if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.remove('show');
        const bars = menuToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
          bar.style.transform = 'none';
          bar.style.opacity = '1';
        });
      }
    });
  }
  
  // تحسين الهيدر عند التمرير
  let lastScrollTop = 0;
  let scrollThreshold = 50;
  let isScrolling = false;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // إضافة/إزالة كلاس scrolled للهيدر
    if (scrollTop > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // جعل الهيدر أكثر شفافية عند التمرير بدلاً من الإخفاء
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
      // التمرير للأسفل - جعل الهيدر أكثر شفافية
      header.classList.remove('scroll-up');
      header.classList.add('scroll-down');
    } else if (scrollTop < lastScrollTop) {
      // التمرير للأعلى - إعادة الشفافية الطبيعية
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
    
    // إزالة الكلاسات بعد فترة من التوقف عن التمرير
    clearTimeout(isScrolling);
    isScrolling = setTimeout(function() {
      header.classList.remove('scroll-down', 'scroll-up');
    }, 1000);
    
    lastScrollTop = scrollTop;
  });
  
  // إضافة تأثيرات تفاعلية للأزرار
  const buttons = document.querySelectorAll('.contact-btn, .login-btn, .social-icon');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // تحسين تجربة المستخدم على الأجهزة المحمولة
  if ('ontouchstart' in window) {
    // إضافة تأخير للتفاعل على الأجهزة اللمسية
    const touchElements = document.querySelectorAll('.main-nav ul li a, .contact-btn, .login-btn');
    touchElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
      });
      
      element.addEventListener('touchend', function() {
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    });
  }
}); 