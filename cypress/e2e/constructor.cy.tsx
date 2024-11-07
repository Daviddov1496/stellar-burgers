describe('Общий тест конструктора и модальных окон', () => {
  beforeEach(() => {
      //Использую метод cy.intercept() для перехвата GET и POST запросов к API
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('ingredients');
      cy.intercept('GET', 'api/orders/all', { fixture: 'feed.json' }).as('feed');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');
      cy.intercept('POST','api/orders', { fixture: 'order.json' }).as('order');
      //выполняю подгрузку данных из фикстур
      cy.fixture('ingredients.json');
      cy.fixture('feed.json');
      cy.fixture('user.json');
      cy.fixture('order.json');
      //устанавливаю куки с имитацией авторизации пользователя
      cy.setCookie('accessToken', 'mockAccessTokenDavid');
      localStorage.setItem('refreshToken', 'mockTokenForDavid');
      //переход на главную страницу
      cy.visit('/');
      //ожидаю получения данных, важно, чтобы он был после cy.visit('/');
      cy.wait('@ingredients');
      cy.wait('@user');
  });

  // очищаю куки и хранилище поле тестов
  afterEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
  });

  describe('Тесты модальных окон', function () {
    beforeEach(function () {
    //Открываю модальное окно перед тестами
    cy.get('ul').find('[href^="/ingredients"]').first().click();
    });
    it('тест открытия модального окна и добавление ингредиента из списка ингредиентов в конструктор', function () {
    cy.get('#modals').within(() => {
    cy.get('h3').contains('Детали ингредиента').should('be.visible');
    cy.get('h3').contains('Краторная булка N-200i').should('exist');
    //состав
    cy.get('p').contains('Калории, ккал').next().should('not.be.empty');
    cy.get('p').contains('Белки, г').next().should('not.be.empty');
    cy.get('p').contains('Жиры, г').next().should('not.be.empty');
    cy.get('p').contains('Углеводы, г').next().should('not.be.empty');
    });
    })
    it('тест закрытия модального окна с описанием ингредиента нажатием по крестику', function () {
    cy.get('#modals').find('button').click();
    cy.get('#modals').should('be.empty');
    cy.get('div').contains('Детали ингредиента').should('not.exist');
    });

    it('тест закрытия модального окна с описанием ингредиента нажатием на esc', function () {
    cy.get('body').type('{esc}');
    cy.get('#modals').should('be.empty');
    cy.get('div').contains('Детали ингредиента').should('not.exist');
    });

    it('тест закрытия модального окна с описанием ингредиента нажатием на оверлей', function () {
    cy.get('#modals').children().last().click('right', { force: true });
    cy.get('#modals').should('be.empty');
    cy.get('div').contains('Детали ингредиента').should('not.exist');
    });
  });

  describe('Тест оформления заказа', function () {
    it('Проверка авторизации перед тестами', function () {
      cy.visit('/profile');
      cy.get(`[data-cy='profile-name']`).should('have.value', 'David');
      cy.get(`[data-cy='profile-email']`).should('have.value', 'David@yandex.ru');
    });
    it('Тест процесса добавление ингридиентов для заказа и его оформления', function () {
      //добавление в заказ булки
      cy.get('[data-cy="burger-constructor"]').contains('Краторная булка N-200i').should('not.exist');
      cy.get('h3').contains('Булки').next('ul').children().first().contains('Добавить').click();
      cy.get('[data-cy="burger-constructor"]').contains('Краторная булка N-200i').should('exist');
      //начинки
      cy.get('[data-cy="burger-constructor"]').contains('Биокотлета из марсианской Магнолии').should('not.exist');
      cy.get('h3').contains('Начинки').next('ul').children().first().contains('Добавить').click();
      cy.get('[data-cy="burger-constructor"]').contains('Биокотлета из марсианской Магнолии').should('exist');
      //соус
      cy.get('[data-cy="burger-constructor"]').contains('Соус Spicy-X').should('not.exist');
      cy.get('h3').contains('Соусы').next('ul').children().first().contains('Добавить').click();
      cy.get('[data-cy="burger-constructor"]').contains('Соус Spicy-X').should('exist');
      //Проверим, что нет пустых полей для создания бургера в конструкторе
      cy.get('div').contains('Выберите булки').should('not.exist');
      cy.get('div').contains('Выберите начинку').should('not.exist');
      //Вызывается клик по кнопке «Оформить заказ».
      cy.get('button').contains('Оформить заказ').click();
      cy.wait('@order');
      //Проверяется, что модальное окно открылось и номер заказа верный.
      cy.get('[data-cy="modal"]').find('h2').contains('46208').should('exist');
      //Закрывается модальное окно и проверяется успешность закрытия.
      cy.get('#modals').find('button').click();
      cy.get('#modals').should('be.empty');
      //Проверяется, что конструктор пуст.
      cy.get('div').contains('Выберите булки').should('exist');
      cy.get('div').contains('Выберите начинку').should('exist');
    });
  });
})
