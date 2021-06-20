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
        document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs__btn_active');
      tabsHandler(tabsPath);
    }

    function tabsHandler(path) {
      tabsContent.forEach(el => {
        el.classList.remove('tabs__content_active')
      });
      tabContainer.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content_active');
    }
  });
}