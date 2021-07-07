function Tab(tabSelector) {
  const tabContainer = document.querySelector(tabSelector);
  const tabsBtn = tabContainer.querySelectorAll('.tabs__btn');
  const tabsContent = tabContainer.querySelectorAll('.tabs__content');

  tabContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('tabs__btn')) {
      const tabsPath = e.target.dataset.tabsPath;
      tabsBtn.forEach(el => {
        el.classList.remove('tabs__btn_active')
      });
      this.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs__btn_active');
      tabsHandler(tabsPath);

      if (e.target.classList.contains('compare-block__btn')) {
        new BeerSlider(this.querySelector(`.floor${tabsPath}`), {
          start: 50
        });
      }
    }

    function tabsHandler(path) {
      tabsContent.forEach(el => {
        el.classList.remove('tabs__content_active')
      });
      tabContainer.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content_active');
    }
  });
}

function OuterTab(tabSelector) {
  const tabContainer = document.querySelector(tabSelector);
  const tabsBtn = tabContainer.querySelectorAll('.outer-tabs__btn');
  const tabsContent = tabContainer.querySelectorAll('.outer-tabs__content');

  tabContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('outer-tabs__btn')) {
      const tabsPath = e.target.dataset.tabsPath;
      
      tabsBtn.forEach(el => {
        el.classList.remove('outer-tabs__btn_active')
      });
      document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('outer-tabs__btn_active');
      tabsHandler(tabsPath);

      tabContainer.querySelectorAll('.outer-tab__props').forEach(element => {
        element.classList.toggle('hidden')
      });

      const beforeAfterSlider = this.querySelector('.outer-tabs__content_active  .beer-slider');
      new BeerSlider(beforeAfterSlider, {
        start: 50
      });

    }

    function tabsHandler(path) {
      tabsContent.forEach(el => {
        el.classList.remove('outer-tabs__content_active')
      });
      tabContainer.querySelector(`[data-tabs-target="${path}"]`).classList.add('outer-tabs__content_active');
    }
  });
}