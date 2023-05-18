import React from 'react';
import { Route, Routes} from 'react-router-dom';
import {Layout} from './components/Layout';
import { Login } from './components/authorize/Login';
import { Registration } from './components/authorize/Registration';
import { Home } from './components/Home';
import { Users} from './components/users/Users';
import {User} from './components/users/User';
import { Competitions } from './components/Competitions';
import { NotFound } from './components/notfound/notfound';
import { CompetitionPage } from './components/competitionPage/CompetitionPage';
import { GroupPage } from './components/groupPage/GroupPage';
import { MyGroup } from './components/myGroupsPage/MyGroup';
import { GroupChange } from './components/groupChange/GroupChange';
import { MyCompetition } from './components/myCompetitionPage/MyCompetition';
import { CompetitionChange } from './components/groupChange/CompetitionChange';
import { MyStatement } from './components/mystatementPage/MyStatement';
import { AddStatement } from './components/addStatment/AddStatement';
import { Statements } from './components/statements/Statements';
import { DetailStatement } from './components/detailStatement/DetailStatement';
import {AtributsPage} from './components/AtributsPage/AtributsPage';
import { ServicesPage } from './components/ServicesPage/ServicesPage';
import { Products } from './components/products/Products';
import { ProductPage } from './components/ProductPage/ProductPage';
import { tableAtribut, tableService, inputTitleService, inputTitleAtribut, atributsCategory, servicesCategory } from './Constant';
import { DetailProduct } from './components/detailProduct/DetailProduct';
import { AddProduct } from './components/addProduct/AddProduct';
import { MyOrders } from './components/myOrders/MyOrders';
import { Basket } from './components/Basket/Basket';
import { Orders } from './components/orders/Orders';
import { TableParticipant } from './components/myCompetitionPage/TableParticipant';
import { MyGroupCompetitions } from './components/myGroupsPage/MyGroupCompetitions';

import './index.scss';
import { DetailOrder } from './components/DetailOrder/DetailOrder';


export default function App() {

    return (
        <Routes>
            <Route path  = '/' element = {<Layout />}>
              <Route index element={<Home />} />
                <Route path = ':id' element = {<GroupPage />} />
              
              <Route path= 'competitions/:id' element = {<CompetitionPage />} />
              <Route path='competitions' element={<Competitions/>} />
              
              <Route path = 'attributes' element = {<AtributsPage/>} />
              <Route path = 'attributes/:id' element = {<ProductPage link="attributes"/>} />
              
              <Route path = 'services' element = {<ServicesPage/>} />
              <Route path = 'services/:id' element = {<ProductPage link="services"/>} />
              
              <Route path='users/:id' element={<User/>} />
              <Route path='users' element={<Users/>} />
              
              <Route path='statements/:id' element={<DetailStatement />} />
              <Route path='statements' element={<Statements />} />
              
              <Route path='products/add' element={<AddProduct />} />

              <Route path = 'products/attributes' element = {<Products path={"attributes"} urlDelete="attributes" title={"Атрибутика"} listTitle={tableAtribut}/>} />
              <Route path = 'products/attributes/:id' element = {<DetailProduct path={"attributes"} titles={inputTitleAtribut} listCategory={atributsCategory} />} />
              
              <Route path = 'products/services' element = {<Products path={"services"} urlDelete="services" title={"Услуги"} listTitle={tableService}/>} />
              <Route path = 'products/services/:id' element = {<DetailProduct path={"services"} titles={inputTitleService} listCategory={servicesCategory} />} />
              
              <Route path = 'myproducts/attributes' element = {<Products path={"myattributes"} urlDelete="attributes" title={"Атрибутика"} listTitle={tableAtribut}/>} />
              <Route path = 'myproducts/attributes/:id' element = {<DetailProduct path={"attributes"} titles={inputTitleAtribut} listCategory={atributsCategory}/>} />
              
              <Route path = 'myproducts/services' element = {<Products path={"myservices"} urlDelete="services" title={"Услуги"} listTitle={tableService}/>} />
              <Route path = 'myproducts/services/:id' element = {<DetailProduct path={"services"} titles={inputTitleService} listCategory={servicesCategory} />} />
              
              <Route path = 'mygroups' element = {<MyGroup/>} />
              <Route path = 'mygroups/change/:id' element = {<GroupChange/>} />
              <Route path = 'mygroups/competitions/:id' element = {<MyGroupCompetitions/>} />

              <Route path = 'mycompetitions' element = {<MyCompetition />} />
              <Route path = 'mycompetitions/change/:id' element = {<CompetitionChange />} />
              <Route path = 'mycompetitions/participants/:id' element={<TableParticipant/>} />

              <Route path = 'mystatements' element = {<MyStatement />} />

              <Route path = 'statement' element = {<AddStatement/>} />

              <Route path = 'orders' element = {<MyOrders/>} />
              <Route path = 'basket' element = {<Basket />} />

              <Route path = 'allorders' element = {<Orders title="Заказы"/>} />
              <Route path = 'allorders/:id' element = {<DetailOrder/>} />
              <Route path = 'myorders' element = {<Orders title="Заказанные атрибутика и услуги"/>} />
              <Route path = 'myorders/:id' element = {<DetailOrder/>} />

            </Route>
            <Route exact path = '/login' element = {<Login />} />
            <Route exact path = '/signin' element = {<Registration />} />
            <Route path = "/notfound" element = {<NotFound />} />
            <Route path = "/*" element = {<NotFound />} />
        </Routes> 
    );
}
