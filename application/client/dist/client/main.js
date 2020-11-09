(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/Auth/auth.verify.ts":
/*!*************************************!*\
  !*** ./src/app/Auth/auth.verify.ts ***!
  \*************************************/
/*! exports provided: AuthVerify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthVerify", function() { return AuthVerify; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



var AuthVerify = /** @class */ (function () {
    function AuthVerify(router) {
        this.router = router;
    }
    AuthVerify.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return true;
    };
    AuthVerify.ɵfac = function AuthVerify_Factory(t) { return new (t || AuthVerify)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
    AuthVerify.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthVerify, factory: AuthVerify.ɵfac });
    return AuthVerify;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthVerify, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-management/user-management.component */ "./src/app/user-management/user-management.component.ts");
/* harmony import */ var _doctor_doctor_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./doctor/doctor.component */ "./src/app/doctor/doctor.component.ts");
/* harmony import */ var _patient_patient_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./patient/patient.component */ "./src/app/patient/patient.component.ts");
/* harmony import */ var _Auth_auth_verify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Auth/auth.verify */ "./src/app/Auth/auth.verify.ts");









var routes = [
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
    { path: 'users', component: _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_3__["UserManagementComponent"], canActivate: [_Auth_auth_verify__WEBPACK_IMPORTED_MODULE_6__["AuthVerify"]] },
    { path: 'doctor', component: _doctor_doctor_component__WEBPACK_IMPORTED_MODULE_4__["DoctorComponent"], canActivate: [_Auth_auth_verify__WEBPACK_IMPORTED_MODULE_6__["AuthVerify"]] },
    { path: 'patient', component: _patient_patient_component__WEBPACK_IMPORTED_MODULE_5__["PatientComponent"], canActivate: [_Auth_auth_verify__WEBPACK_IMPORTED_MODULE_6__["AuthVerify"]] },
    //default
    { path: '**', redirectTo: '/login' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
    AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
    return AppRoutingModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/app/services/index.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/__ivy_ngcc__/esm2015/material.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");





var AppComponent = /** @class */ (function () {
    function AppComponent(auth) {
        this.auth = auth;
        this.title = 'Health-System';
    }
    AppComponent.prototype.logout = function () {
        console.log("init Logout");
        this.auth.logout();
    };
    AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services__WEBPACK_IMPORTED_MODULE_1__["AuthService"])); };
    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 12, vars: 1, consts: [["color", "primary"], [1, "spacer"], ["href", "#", 3, "click"], [2, "height", "40px"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-toolbar", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-toolbar-row");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "span", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_a_click_7_listener() { return ctx.logout(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Logout");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "router-outlet");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "div", 3);
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.title);
        } }, directives: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbar"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarRow"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"] });
    return AppComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], function () { return [{ type: _services__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/__ivy_ngcc__/esm2015/material.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user-management/user-management.component */ "./src/app/user-management/user-management.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/index */ "./src/app/services/index.ts");
/* harmony import */ var _Auth_auth_verify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Auth/auth.verify */ "./src/app/Auth/auth.verify.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _doctor_doctor_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./doctor/doctor.component */ "./src/app/doctor/doctor.component.ts");
/* harmony import */ var _patient_patient_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./patient/patient.component */ "./src/app/patient/patient.component.ts");















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_services_index__WEBPACK_IMPORTED_MODULE_9__["ApiService"],
            _services_index__WEBPACK_IMPORTED_MODULE_9__["AuthService"],
            _services_index__WEBPACK_IMPORTED_MODULE_9__["UserService"],
            _Auth_auth_verify__WEBPACK_IMPORTED_MODULE_10__["AuthVerify"]], imports: [[
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatToolbarModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["BrowserAnimationsModule"]
            ]] });
    return AppModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        _login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
        _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_7__["UserManagementComponent"],
        _doctor_doctor_component__WEBPACK_IMPORTED_MODULE_12__["DoctorComponent"],
        _patient_patient_component__WEBPACK_IMPORTED_MODULE_13__["PatientComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
        _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTabsModule"],
        _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogModule"],
        _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"],
        _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
        _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
        _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableModule"],
        _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatToolbarModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["BrowserAnimationsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                    _login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
                    _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_7__["UserManagementComponent"],
                    _doctor_doctor_component__WEBPACK_IMPORTED_MODULE_12__["DoctorComponent"],
                    _patient_patient_component__WEBPACK_IMPORTED_MODULE_13__["PatientComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTabsModule"],
                    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogModule"],
                    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"],
                    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
                    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableModule"],
                    _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatToolbarModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__["BrowserAnimationsModule"]
                ],
                providers: [_services_index__WEBPACK_IMPORTED_MODULE_9__["ApiService"],
                    _services_index__WEBPACK_IMPORTED_MODULE_9__["AuthService"],
                    _services_index__WEBPACK_IMPORTED_MODULE_9__["UserService"],
                    _Auth_auth_verify__WEBPACK_IMPORTED_MODULE_10__["AuthVerify"]],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/doctor/doctor.component.ts":
/*!********************************************!*\
  !*** ./src/app/doctor/doctor.component.ts ***!
  \********************************************/
/*! exports provided: DoctorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoctorComponent", function() { return DoctorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");



var DoctorComponent = /** @class */ (function () {
    function DoctorComponent(user) {
        this.user = user;
    }
    DoctorComponent.prototype.ngOnInit = function () {
        this.currentUser = this.user.getCurrentUser();
    };
    DoctorComponent.ɵfac = function DoctorComponent_Factory(t) { return new (t || DoctorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"])); };
    DoctorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DoctorComponent, selectors: [["app-doctor"]], decls: 3, vars: 1, consts: [["id", "doctor"]], template: function DoctorComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Doctor Portal - ", ctx.currentUser.userid, "");
        } }, styles: ["#producer[_ngcontent-%COMP%] {\n  color: #403F4C;\n}\n#producer[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n}\n#producer[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], #producer[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 25px;\n  margin-bottom: 20px;\n  padding: 1em;\n}\n#producer[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  margin-top: -20px;\n  background: yellow;\n  padding: 0.5em;\n  display: inline-block;\n  font-size: 0.9em;\n  margin-bottom: 20px;\n}\n#producer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  background: #bfd7f0;\n}\n#producer[_ngcontent-%COMP%]   .formstyle[_ngcontent-%COMP%] {\n  width: 50%;\n  min-height: 415px;\n  float: left;\n}\n#producer[_ngcontent-%COMP%]   .messageareastyle[_ngcontent-%COMP%] {\n  display: block;\n  border-radius: 5px;\n  height: 415px;\n  width: 50%;\n  padding: 5px;\n  float: left;\n  overflow-y: scroll;\n}\n#producer[_ngcontent-%COMP%]   .messageareastyle[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  margin: 5px;\n  padding: 5px;\n  text-align: left;\n}\n#producer[_ngcontent-%COMP%]   .product-change-button[_ngcontent-%COMP%] {\n  background: #CEEAF7;\n  color: #403F4C;\n  width: 125px;\n  border: 1px white solid;\n  width: 250px;\n  font-size: 75%;\n  text-transform: uppercase;\n  padding: 1em;\n  cursor: pointer;\n  font-family: \"Montserrat\";\n}\n#producer[_ngcontent-%COMP%]   .product-change-button[_ngcontent-%COMP%]:hover {\n  background: #77BFA3;\n}\n#producer[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  border-collapse: collapse;\n  width: 100%;\n}\n#producer[_ngcontent-%COMP%]   table[_ngcontent-%COMP%], #producer[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], #producer[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border: 1px solid black;\n}\n#producer[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: center;\n  background-color: #F7F7F7;\n  color: black;\n}\n#producer[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], #producer[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 5px;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZG9jdG9yL2RvY3Rvci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29sb3JzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxjQ0dVO0FESFo7QUFDRTtFQUNJLGNBQUE7QUFDTjtBQUNNO0VBQ0ksY0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBQ1Y7QUFFTTtFQUNJLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBQVY7QUFJRTtFQUNJLG1CQUFBO0FBRk47QUFLRTtFQUNJLFVBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7QUFITjtBQU1FO0VBRUksY0FBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBTE47QUFNTTtFQUNJLGNBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQUpWO0FBUUU7RUFDRSxtQkN0Q1U7RUR1Q1YsY0NqRFE7RURrRFIsWUFBQTtFQUVBLHVCQUFBO0VBRUEsWUFBQTtFQUNBLGNBQUE7RUFFQSx5QkFBQTtFQUVBLFlBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7QUFWSjtBQWFFO0VBQ0UsbUJDbERXO0FEdUNmO0FBY0U7RUFDSSx5QkFBQTtFQUNBLFdBQUE7QUFaTjtBQWVFO0VBQ0ksdUJBQUE7QUFiTjtBQWdCRTtFQUNJLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0FBZE47QUFpQkU7RUFDSSxZQUFBO0VBQ0Esa0JBQUE7QUFmTiIsImZpbGUiOiJzcmMvYXBwL2RvY3Rvci9kb2N0b3IuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLy4uL2NvbG9ycy5zY3NzJztcbiNwcm9kdWNlciB7XG4gIGNvbG9yOiAkZGFyay1ncmV5O1xuICBsYWJlbCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcblxuICAgICAgaW5wdXQsIHRleHRhcmVhIHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDI1cHg7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgICAgICBwYWRkaW5nOiAxZW07XG4gICAgICB9XG5cbiAgICAgIC5lcnJvciB7XG4gICAgICAgICAgbWFyZ2luLXRvcDogLTIwcHg7XG4gICAgICAgICAgYmFja2dyb3VuZDogeWVsbG93O1xuICAgICAgICAgIHBhZGRpbmc6IC41ZW07XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIGZvbnQtc2l6ZTogLjllbTtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgfVxuICB9XG5cbiAgYnV0dG9uOmRpc2FibGVkIHtcbiAgICAgIGJhY2tncm91bmQ6ICNiZmQ3ZjAgO1xuICB9XG5cbiAgLmZvcm1zdHlsZSB7XG4gICAgICB3aWR0aDogNTAlO1xuICAgICAgbWluLWhlaWdodDogNDE1cHg7XG4gICAgICBmbG9hdDogbGVmdDtcbiAgfVxuXG4gIC5tZXNzYWdlYXJlYXN0eWxlIHtcblxuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICBoZWlnaHQ6IDQxNXB4O1xuICAgICAgd2lkdGg6IDUwJTtcbiAgICAgIHBhZGRpbmc6IDVweDtcbiAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgb3ZlcmZsb3cteTpzY3JvbGw7XG4gICAgICBwIHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBtYXJnaW46IDVweDtcbiAgICAgICAgICBwYWRkaW5nOiA1cHg7XG4gICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgIH1cbiAgfVxuXG4gIC5wcm9kdWN0LWNoYW5nZS1idXR0b24ge1xuICAgIGJhY2tncm91bmQ6ICRwYXN0ZWwtYmx1ZTtcbiAgICBjb2xvcjogJGRhcmstZ3JleTtcbiAgICB3aWR0aDogMTI1cHg7XG5cbiAgICBib3JkZXI6IDFweCB3aGl0ZSBzb2xpZDtcbiAgICAvLyBib3JkZXItc3R5bGU6IG91dHNldDtcbiAgICB3aWR0aDogMjUwcHg7XG4gICAgZm9udC1zaXplOiA3NSU7XG5cbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIC8vIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBwYWRkaW5nOiAxZW07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdCc7XG4gIH1cblxuICAucHJvZHVjdC1jaGFuZ2UtYnV0dG9uOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAkYnJpZ2h0LWdyZWVuO1xuICB9XG5cbiAgdGFibGUge1xuICAgICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgdGFibGUsIHRoLCB0ZCB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgfVxuXG4gIHRoIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGN0Y3Rjc7XG4gICAgICBjb2xvcjogYmxhY2s7XG4gIH1cblxuICB0aCwgdGQge1xuICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG5cbn1cbiIsIlxuLy8gQmFja2dyb3VuZFxuJG9mZi13aGl0ZS1ncmV5OiAjRThFOEU4O1xuJGxpZ2h0LWdyZXk6ICNEOERCRTI7XG4kZ3JleTogIzgyOEE5NTtcbiRkYXJrLWdyZXk6ICM0MDNGNEM7XG5cbi8vIE5vdGlmaWNhdGlvbiBTZWN0aW9uXG4kY29vbC10ZWFsOiAjNEQ3QzhBO1xuJHN0ZWVsLXRlYWw6ICM2MTlCOEE7XG5cbi8vIFdoaXRlIEFjY2VudFxuJGdob3N0LXdoaXRlOiAjRkFGQUZGO1xuXG4vLyBBY2NlbnQgIzFcbiRwYXN0ZWwtYmx1ZTogI0NFRUFGNztcbiRsaWdodC15ZWxsb3c6ICNGRUZGQkU7XG5cbi8vIEFjY2VudCAjMiAmIEdvb2QvRG9uZSBzdGF0dXNcbiRsaWdodC1ncmVlbjogI0I5RDhDMjtcbiRicmlnaHQtZ3JlZW46ICM3N0JGQTM7XG5cbi8vIFdhcm5pbmcgQ29sb3JcbiRzcGFuaXNoLXBpbms6ICNFQkJBQjk7XG4kYnJpZ2h0LXJlZDogI0I5MzE0RjtcblxuLy8jRUQ2QTVBOyB0ZXJyYWNvdGFcblxuLy8jQjkzMTRGOyBkaW5neSBkdW5nZW9uXG4iXX0= */"] });
    return DoctorComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DoctorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-doctor',
                templateUrl: './doctor.component.html',
                styleUrls: ['./doctor.component.scss']
            }]
    }], function () { return [{ type: _services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/index */ "./src/app/services/index.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");






function LoginComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Userid is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Password is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_img_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 16);
} }
var _c0 = function (a0) { return { "has-error": a0 }; };
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, apiService, userService) {
        this.router = router;
        this.apiService = apiService;
        this.userService = userService;
        this.model = {};
        this.loading = false;
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        var user = {
            userid: this.model.userid,
            password: this.model.password,
            usertype: ""
        };
        this.apiService.id = this.model.userid;
        this.apiService.pwd = this.model.password;
        this.apiService.getUser().subscribe(function (res) {
            user.usertype = res['usertype'];
            _this.userService.setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (res['usertype'] == "admin") {
                _this.router.navigate(['users']);
                console.log("Success login () admin");
            }
            else {
                _this.router.navigate([res['usertype']]);
                console.log("Success login ()", res['usertype']);
            }
        }, function (error) {
            console.log(JSON.stringify(error));
            alert("Login failed: ");
            _this.loading = false;
        });
    };
    LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_index__WEBPACK_IMPORTED_MODULE_2__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_index__WEBPACK_IMPORTED_MODULE_2__["UserService"])); };
    LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([])], decls: 22, vars: 12, consts: [["id", "login"], [1, "col-md-6", "col-md-offset-3"], ["name", "form", "novalidate", "", 3, "ngSubmit"], ["f", "ngForm"], [1, "form-group", 3, "ngClass"], ["for", "userid"], ["type", "text", "name", "userid", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["userid", "ngModel"], ["class", "help-block", 4, "ngIf"], ["for", "password"], ["type", "password", "name", "password", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["password", "ngModel"], [1, "form-group"], [1, "btn", "btn-primary", 3, "disabled"], ["src", "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==", 4, "ngIf"], [1, "help-block"], ["src", "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
            var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Login");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "form", 2, 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5); return _r0.form.valid && ctx.login(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "label", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Userid");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "input", 6, 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_9_listener($event) { return ctx.model.userid = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, LoginComponent_div_11_Template, 2, 0, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "label", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Password");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "input", 10, 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_15_listener($event) { return ctx.model.password = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, LoginComponent_div_17_Template, 2, 0, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Login");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, LoginComponent_img_21_Template, 1, 0, "img", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10);
            var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](8, _c0, _r0.submitted && !_r1.valid));
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.model.userid);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r0.submitted && !_r1.valid);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](10, _c0, _r0.submitted && !_r3.valid));
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.model.password);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r0.submitted && !_r3.valid);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.loading);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loading);
        } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgForm"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"]], styles: ["#login[_ngcontent-%COMP%] {\n  display: flex;\n}\n#login[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #403F4C;\n}\n#login[_ngcontent-%COMP%]   .how-to[_ngcontent-%COMP%] {\n  background-color: #E8E8E8;\n  padding: 24px;\n  color: #4D7C8A;\n}\n#login[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  color: #FAFAFF;\n  background-color: #4D7C8A;\n  border-color: #4D7C8A;\n}\n#login[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover {\n  background-color: #77BFA3;\n  border-color: #77BFA3;\n}\n#login[_ngcontent-%COMP%]   .btn-link[_ngcontent-%COMP%] {\n  color: #4D7C8A;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbG9ycy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsYUFBQTtBQUFGO0FBRUU7RUFDRSxjQUFBO0FBQUo7QUFHRTtFQUNFLHlCQ1BhO0VEUWIsYUFBQTtFQUNBLGNDSFE7QURFWjtBQUlFO0VBQ0UsY0NIVTtFRElWLHlCQ1JRO0VEU1IscUJDVFE7QURPWjtBQUlFO0VBRUUseUJDRFc7RURFWCxxQkNGVztBRERmO0FBTUU7RUFDRSxjQ2xCUTtBRGNaIiwiZmlsZSI6InNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLy4uL2NvbG9ycy5zY3NzJztcbiNsb2dpbntcbiAgZGlzcGxheTogZmxleDtcblxuICBoMntcbiAgICBjb2xvcjokZGFyay1ncmV5O1xuICB9XG5cbiAgLmhvdy10b3tcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkb2ZmLXdoaXRlLWdyZXk7XG4gICAgcGFkZGluZzogMjRweDtcbiAgICBjb2xvcjogJGNvb2wtdGVhbDtcbiAgfVxuXG4gIC5idG4tcHJpbWFyeXtcbiAgICBjb2xvcjogJGdob3N0LXdoaXRlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb29sLXRlYWw7XG4gICAgYm9yZGVyLWNvbG9yOiAkY29vbC10ZWFsO1xuICB9XG4gIC5idG4tcHJpbWFyeTpob3ZlcntcblxuICAgIGJhY2tncm91bmQtY29sb3I6ICRicmlnaHQtZ3JlZW47XG4gICAgYm9yZGVyLWNvbG9yOiAkYnJpZ2h0LWdyZWVuO1xuICB9XG5cbiAgLmJ0bi1saW5re1xuICAgIGNvbG9yOiAkY29vbC10ZWFsO1xuICB9XG5cblxufVxuIiwiXG4vLyBCYWNrZ3JvdW5kXG4kb2ZmLXdoaXRlLWdyZXk6ICNFOEU4RTg7XG4kbGlnaHQtZ3JleTogI0Q4REJFMjtcbiRncmV5OiAjODI4QTk1O1xuJGRhcmstZ3JleTogIzQwM0Y0QztcblxuLy8gTm90aWZpY2F0aW9uIFNlY3Rpb25cbiRjb29sLXRlYWw6ICM0RDdDOEE7XG4kc3RlZWwtdGVhbDogIzYxOUI4QTtcblxuLy8gV2hpdGUgQWNjZW50XG4kZ2hvc3Qtd2hpdGU6ICNGQUZBRkY7XG5cbi8vIEFjY2VudCAjMVxuJHBhc3RlbC1ibHVlOiAjQ0VFQUY3O1xuJGxpZ2h0LXllbGxvdzogI0ZFRkZCRTtcblxuLy8gQWNjZW50ICMyICYgR29vZC9Eb25lIHN0YXR1c1xuJGxpZ2h0LWdyZWVuOiAjQjlEOEMyO1xuJGJyaWdodC1ncmVlbjogIzc3QkZBMztcblxuLy8gV2FybmluZyBDb2xvclxuJHNwYW5pc2gtcGluazogI0VCQkFCOTtcbiRicmlnaHQtcmVkOiAjQjkzMTRGO1xuXG4vLyNFRDZBNUE7IHRlcnJhY290YVxuXG4vLyNCOTMxNEY7IGRpbmd5IGR1bmdlb25cbiJdfQ== */"] });
    return LoginComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-login',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.scss'],
                providers: []
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }, { type: _services_index__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }, { type: _services_index__WEBPACK_IMPORTED_MODULE_2__["UserService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/patient/patient.component.ts":
/*!**********************************************!*\
  !*** ./src/app/patient/patient.component.ts ***!
  \**********************************************/
/*! exports provided: PatientComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientComponent", function() { return PatientComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services */ "./src/app/services/index.ts");





var PatientComponent = /** @class */ (function () {
    function PatientComponent(userService, apiService) {
        this.userService = userService;
        this.apiService = apiService;
        this.data = [];
        this.properties = "";
        this.flag = false;
        this.submitted = false;
        this.success = false;
    }
    PatientComponent.prototype.ngOnInit = function () {
        this.currentUser = this.userService.getCurrentUser();
    };
    //prepare data
    PatientComponent.prototype.onFileLoad = function (fileLoadedEvent) {
        var e_1, _a;
        var textFromFileLoaded = fileLoadedEvent.target.result;
        this.csvContent = textFromFileLoaded;
        var flag = false;
        var objarray = [];
        var prop = [];
        var size = 0;
        var patientId = 1;
        var doctorId = 1;
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.csvContent.split(/[\r\n]+/)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var line = _c.value;
                if (flag) {
                    var obj = {};
                    for (var k = 0; k < size; k++) {
                        //Dynamic Object Properties
                        obj[prop[k]] = line.split(',')[k];
                    }
                    if (obj["age"] == undefined || obj["cxr_label"] == undefined) {
                        //filter out
                    }
                    else {
                        obj["patientId"] = "pt" + patientId;
                        obj["doctorId"] = "dt" + doctorId;
                        obj["gender"] = Math.floor(Math.random() * Math.floor(2));
                        obj["symptoms"] = { "days_since_symptom_onset": obj["days_since_symptom_onset"],
                            "cough": obj["cough"],
                            "cough_severity": obj["cough_severity"],
                            "fever": obj["fever"],
                            "sob": obj["sob"],
                            "sob_severity": obj["sob_severity"],
                            "diarrhea": obj["diarrhea"],
                            "fatigue": obj["fatigue"],
                            "headache": obj["headache"],
                            "loss_of_smell": obj["loss_of_smell"],
                            "loss_of_taste": obj["loss_of_taste"],
                            "runny_nose": obj["runny_nose"],
                            "muscle_sore": obj["muscle_sore"],
                            "sore_throat": obj["sore_throat"],
                        };
                        for (var i in obj["symptoms"]) {
                            delete obj[i];
                        }
                        patientId++;
                        if (patientId > doctorId + 5) {
                            doctorId++;
                        }
                        //console.log(obj);
                        objarray.push(obj);
                    }
                }
                else {
                    for (var k = 0; k < line.split(',').length; k++) {
                        size = line.split(',').length;
                        //Removing all the spaces to make them usefull
                        prop.push(line.split(',')[k].replace(/ /g, ''));
                    }
                    flag = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.data = objarray;
        this.properties = [];
        //this.properties = prop;
        //console.log(this.properties);
        console.log(this.data);
        this.create();
        this.flag = true;
    };
    PatientComponent.prototype.onFileSelect = function (input) {
        var files = input.files;
        var fileTypes = ['csv'];
        if (files && files.length) {
            var extension = input.files[0].name.split('.').pop().toLowerCase(), isSuccess = fileTypes.indexOf(extension) > -1;
            if (isSuccess) {
                var fileToRead = files[0];
                var fileReader = new FileReader();
                fileReader.onload = this.onFileLoad;
                fileReader.readAsText(fileToRead, "UTF-8");
            }
            else {
                console.log("Error");
            }
        }
    };
    PatientComponent.prototype.create = function () {
        var _this = this;
        console.log("in create");
        this.apiService.createEMR().subscribe(function (api) {
            _this.data[0] = api;
            //console.log(this.order);
            //this.apiService.queryOrders();
            _this.success = true;
            //alert ("Order Created Successfully!")
        }, function (error) {
            _this.success = false;
            alert("Problem creating Order: " + error['error']['message']);
        });
    };
    PatientComponent.ɵfac = function PatientComponent_Factory(t) { return new (t || PatientComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services__WEBPACK_IMPORTED_MODULE_3__["ApiService"])); };
    PatientComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: PatientComponent, selectors: [["app-producer"]], decls: 12, vars: 1, consts: [["id", "patient"], [1, "btn", "btn-primary", 3, "click"], [1, "container-fluid"], [1, "col-md-6"], ["src", "https://img.icons8.com/color/48/000000/csv.png"], [1, "text-muted", 2, "font-size", "22px"], [1, "form-group"], ["accept", ".csv", "id", "csv", "type", "file", "name", "myfile", 1, "form-control", 3, "change"]], template: function PatientComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h3");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PatientComponent_Template_button_click_3_listener() { return ctx.create(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "create");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "img", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "span", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Import From CSV");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "input", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function PatientComponent_Template_input_change_11_listener($event) { return ctx.onFileSelect($event.target); });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("patient Portal - ", ctx.currentUser.userid, "");
        } }, styles: [".map-container[_ngcontent-%COMP%] {\n  overflow: hidden;\n  padding-bottom: 56.25%;\n  position: relative;\n  height: 0;\n}\n\n.map-container[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n  left: 0;\n  top: 0;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n}\n\n#table[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\ntable[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: linear-gradient(#3e9686, #53d2a4);\n}\n\n.list-group-item.active[_ngcontent-%COMP%] {\n  z-index: 2;\n  color: #fff;\n  background: linear-gradient(#3e9686, #53d2a4);\n  border: 0;\n}\n\nfooter[_ngcontent-%COMP%] {\n  background: linear-gradient(#3e9686, #53d2a4);\n}\n\nheader[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {\n  background: linear-gradient(#3e9686, #53d2a4);\n}\n\n.white-text[_ngcontent-%COMP%] {\n  color: white !important;\n}\n\n#noti[_ngcontent-%COMP%] {\n  margin-right: 4%;\n}\n\n#noti[_ngcontent-%COMP%]   .p1[data-count][_ngcontent-%COMP%]:after {\n  position: absolute;\n  right: 10%;\n  top: 8%;\n  content: attr(data-count);\n  font-size: 40%;\n  padding: 0.2em;\n  border-radius: 50%;\n  line-height: 1em;\n  color: white;\n  background: rgba(255, 0, 0, 0.85);\n  text-align: center;\n  min-width: 1em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGF0aWVudC9wYXRpZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtBQURBOztBQUdBO0VBQ0EsT0FBQTtFQUNBLE1BQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBQUE7O0FBR0E7RUFDQSxrQkFBQTtBQUFBOztBQUlBO0VBQ0EsNkNBQUE7QUFEQTs7QUFJQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsNkNBQUE7RUFDQSxTQUFBO0FBREE7O0FBR0E7RUFDQSw2Q0FBQTtBQUFBOztBQUdBO0VBQ0EsNkNBQUE7QUFBQTs7QUFFQTtFQUNBLHVCQUFBO0FBQ0E7O0FBQUE7RUFDQSxnQkFBQTtBQUdBOztBQURBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsT0FBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGlDQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBSUEiLCJmaWxlIjoic3JjL2FwcC9wYXRpZW50L3BhdGllbnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLy4uL2NvbG9ycy5zY3NzJztcblxuLm1hcC1jb250YWluZXJ7XG5vdmVyZmxvdzpoaWRkZW47XG5wYWRkaW5nLWJvdHRvbTo1Ni4yNSU7XG5wb3NpdGlvbjpyZWxhdGl2ZTtcbmhlaWdodDowO1xufVxuLm1hcC1jb250YWluZXIgaWZyYW1le1xubGVmdDowO1xudG9wOjA7XG5oZWlnaHQ6MTAwJTtcbndpZHRoOjEwMCU7XG5wb3NpdGlvbjphYnNvbHV0ZTtcbn1cblxuI3RhYmxle1xudGV4dC1hbGlnbjogY2VudGVyO1xuXG59XG5cbnRhYmxlIHRoZWFke1xuYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHJnYig2MiwgMTUwLCAxMzQpLCByZ2IoODMsIDIxMCwgMTY0KSk7XG59XG5cbi5saXN0LWdyb3VwLWl0ZW0uYWN0aXZlIHtcbnotaW5kZXg6IDI7XG5jb2xvcjogI2ZmZjtcbmJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChyZ2IoNjIsIDE1MCwgMTM0KSwgcmdiKDgzLCAyMTAsIDE2NCkpO1xuYm9yZGVyOjA7XG59XG5mb290ZXJ7XG5iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQocmdiKDYyLCAxNTAsIDEzNCksIHJnYig4MywgMjEwLCAxNjQpKTtcbn1cblxuaGVhZGVyIG5hdntcbmJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChyZ2IoNjIsIDE1MCwgMTM0KSwgcmdiKDgzLCAyMTAsIDE2NCkpO1xufVxuLndoaXRlLXRleHQge1xuY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7IH1cbiNub3Rpe1xubWFyZ2luLXJpZ2h0OiA0JTtcbn1cbiNub3RpIC5wMVtkYXRhLWNvdW50XTphZnRlcntcbnBvc2l0aW9uOmFic29sdXRlO1xucmlnaHQ6MTAlO1xudG9wOjglO1xuY29udGVudDogYXR0cihkYXRhLWNvdW50KTtcbmZvbnQtc2l6ZTo0MCU7XG5wYWRkaW5nOi4yZW07XG5ib3JkZXItcmFkaXVzOjUwJTtcbmxpbmUtaGVpZ2h0OjFlbTtcbmNvbG9yOiB3aGl0ZTtcbmJhY2tncm91bmQ6cmdiYSgyNTUsMCwwLC44NSk7XG50ZXh0LWFsaWduOmNlbnRlcjtcbm1pbi13aWR0aDogMWVtO1xufVxuXG4iXX0= */"] });
    return PatientComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](PatientComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-producer',
                templateUrl: './patient.component.html',
                styleUrls: ['./patient.component.scss']
            }]
    }], function () { return [{ type: _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"] }, { type: _services__WEBPACK_IMPORTED_MODULE_3__["ApiService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/services/api.service.ts":
/*!*****************************************!*\
  !*** ./src/app/services/api.service.ts ***!
  \*****************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.service */ "./src/app/services/user.service.ts");







var ApiService = /** @class */ (function () {
    function ApiService(httpClient, userService) {
        this.httpClient = httpClient;
        this.userService = userService;
        this.id = "";
        this.pwd = "";
        this.shipperid = "";
        this.OrdersData = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]([]);
        this.orders$ = this.OrdersData.asObservable();
        this.statuses = {
            1: "ORDER_CREATED",
            2: "ORDER_RECEIVED",
            3: "SHIPMENT_ASSIGNED",
            4: "SHIPMENT_CREATED",
            5: "SHIPMENT_IN_TRANSIT",
            6: "SHIPMENT_RECEIVED",
            7: "ORDER_CLOSED"
        };
        this.baseUrl = "http://localhost:3000";
    }
    ApiService.prototype.getAllStatuses = function () {
        return this.statuses;
    };
    ApiService.prototype.createUserAuthorizationHeader = function (headers) {
        var currentUser = this.userService.getCurrentUser();
        return headers.append('Authorization', 'Basic ' + btoa(currentUser.userid + ':' + currentUser.password));
    };
    //  This API is used:
    //  for a 'retailer' to get a list of 'producers' when creating an order
    //  for a 'producer' to get a list of 'shippers' when assigning a shipper
    ApiService.prototype.getAllUsers = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        //
        //  NOTE: an admin identity is needed to invoke this API since it calls the CA methods. 
        headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw'));
        // replace with this line to pass in the current user vs admin
        //headers = this.createUserAuthorizationHeader(headers);
        return this.httpClient.get(this.baseUrl + '/api/users/', { headers: headers });
    };
    // This API is used during login to get the details of specific user trying to log in
    // The 'usertype' is retrieved to set the currentUser for this application
    ApiService.prototype.getUser = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        //
        //  NOTE: an admin identity is needed to invoke this API since it calls the CA methods. 
        headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw'));
        // replace with this line to pass in the user trying to log in vs admin
        //headers = headers.append('Authorization', 'Basic ' + btoa(this.id+':'+this.pwd)); 
        return this.httpClient.get(this.baseUrl + '/api/users/' + this.id, { headers: headers });
    };
    // This API checks to see if user credentials exist in Wallet
    ApiService.prototype.isUserEnrolled = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers = this.createUserAuthorizationHeader(headers);
        return this.httpClient.get(this.baseUrl + '/api/is-user-enrolled/' + this.id, { headers: headers });
    };
    // NOTE: This API isn't invoked by the UI application.  It is provided to be invoked by URL only
    // As a result, an admin identity needs to call this
    ApiService.prototype.queryEMRByPatientId = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        //headers = this.createUserAuthorizationHeader(headers);
        headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw'));
        console.log("queryEMRByPatientId --- api service" + this.id);
        return this.httpClient.get(this.baseUrl + '/api/getEMRByPatientId/' + this.id, { headers: headers });
    };
    ApiService.prototype.queryOrders = function () {
        var _this = this;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers = this.createUserAuthorizationHeader(headers);
        this.httpClient.get(this.baseUrl + '/api/orders/', { headers: headers }).subscribe(function (orders) {
            var e_1, _a;
            console.log(orders);
            try {
                // Add status to each order, based on this.statuses
                for (var orders_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(orders), orders_1_1 = orders_1.next(); !orders_1_1.done; orders_1_1 = orders_1.next()) {
                    var i = orders_1_1.value;
                    i.status = _this.statuses[i.currentOrderState];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (orders_1_1 && !orders_1_1.done && (_a = orders_1.return)) _a.call(orders_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            _this.OrdersData.next(orders);
        }, function (error) {
            console.log(JSON.stringify(error));
            alert("Problem getting orders: " + error['error']['message']);
        });
    };
    ApiService.prototype.clearOrders = function () {
        this.OrdersData.next([]);
    };
    ApiService.prototype.createEMR = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers = this.createUserAuthorizationHeader(headers);
        return this.httpClient.post(this.baseUrl + '/api/EMRs', this.body, { headers: headers });
    };
    ApiService.prototype.receiveOrder = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers = this.createUserAuthorizationHeader(headers);
        return this.httpClient.put(this.baseUrl + '/api/receive-order/' + this.id, {}, { headers: headers });
    };
    ApiService.prototype.assignShipper = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers = this.createUserAuthorizationHeader(headers);
        return this.httpClient.put(this.baseUrl + '/api/assign-shipper/' + this.id + '?shipperid=' + this.shipperid, {}, { headers: headers });
    };
    ApiService.prototype.createShipment = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers = this.createUserAuthorizationHeader(headers);
        return this.httpClient.put(this.baseUrl + '/api/create-shipment-for-order/' + this.id, {}, { headers: headers });
    };
    ApiService.prototype.transportShipment = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers = this.createUserAuthorizationHeader(headers);
        return this.httpClient.put(this.baseUrl + '/api/transport-shipment/' + this.id, {}, { headers: headers });
    };
    ApiService.prototype.receiveShipment = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers = this.createUserAuthorizationHeader(headers);
        return this.httpClient.put(this.baseUrl + '/api/receive-shipment/' + this.id, {}, { headers: headers });
    };
    ApiService.ɵfac = function ApiService_Factory(t) { return new (t || ApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"])); };
    ApiService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' });
    return ApiService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ApiService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }, { type: _user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/services/auth.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");







var AuthService = /** @class */ (function () {
    // Use if testing without connecting to a blockchain service
    // users: User[];
    function AuthService(httpClient, api, userService, router) {
        this.httpClient = httpClient;
        this.api = api;
        this.userService = userService;
        this.router = router;
        this.baseUrl = "http://localhost:3000";
        // get all users in fake database. Use if testing without connecting to a blockchain service
        // this.users = userService.getAll();
    }
    AuthService.prototype.register = function (user) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]();
        headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw'));
        return this.httpClient.post(this.baseUrl + '/api/register-user', user, { headers: headers, responseType: 'text' });
    };
    AuthService.prototype.enroll = function (user) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]();
        headers = headers.append('Authorization', 'Basic ' + btoa(user.userid + ':' + user.password));
        return this.httpClient.post(this.baseUrl + '/api/enroll-user', { usertype: user.usertype }, { headers: headers, responseType: 'text' });
    };
    AuthService.prototype.logout = function () {
        this.api.clearOrders();
        this.userService.clearCurrentUser();
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    };
    AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"])); };
    AuthService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
    return AuthService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }, { type: _user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/app/services/index.ts":
/*!***********************************!*\
  !*** ./src/app/services/index.ts ***!
  \***********************************/
/*! exports provided: ApiService, AuthService, UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ "./src/app/services/api.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return _api_service__WEBPACK_IMPORTED_MODULE_0__["ApiService"]; });

/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ "./src/app/services/auth.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return _auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]; });

/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.service */ "./src/app/services/user.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return _user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]; });






/***/ }),

/***/ "./src/app/services/user.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


var UserService = /** @class */ (function () {
    function UserService() {
        this.id = "";
        // initialize users - for testing without connecting to a blockchain network
        // this.users = [
        //   {"userid": "kai", "password": "test123", "role": "admin"},
        //   {"userid": "producer1", "password": "test123", "role": "producer"},
        //   {"userid": "retailer1", "password": "test123", "role": "retailer"},
        //   {"userid": "shipper1", "password": "test123", "role": "shipper"},
        //   {"userid": "regulator1", "password": "test123", "role": "regulator"},
        //   {"userid": "customer", "password": "test123", "role": "customer"},
        // ];
        //
        // this.currentUser = {
        //   userid: "admin",
        //   password: "adminpw",
        //   usertype: "admin"
        // }
        var user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
        }
    }
    UserService.prototype.setCurrentUser = function (user) {
        this.currentUser = user;
    };
    UserService.prototype.getCurrentUser = function () {
        //console.log("in getCurrentUser, this.currentUser: " + this.currentUser.userid);
        return this.currentUser;
    };
    UserService.prototype.clearCurrentUser = function () {
        this.currentUser = null;
    };
    UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(); };
    UserService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac });
    return UserService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/user-management/user-management.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/user-management/user-management.component.ts ***!
  \**************************************************************/
/*! exports provided: UserManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserManagementComponent", function() { return UserManagementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/__ivy_ngcc__/esm2015/table.js");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/index */ "./src/app/services/index.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");








function UserManagementComponent_div_11_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "ID is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function UserManagementComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, UserManagementComponent_div_11_div_1_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.newUserForm.controls.id.errors.required);
} }
function UserManagementComponent_div_15_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Password is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function UserManagementComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, UserManagementComponent_div_15_div_1_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.newUserForm.controls.password.errors.required);
} }
function UserManagementComponent_div_19_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Password confirmation is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function UserManagementComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, UserManagementComponent_div_19_div_1_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.newUserForm.controls.confirm_password.errors.required);
} }
function UserManagementComponent_option_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    var r_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngValue", r_r9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r9);
} }
function UserManagementComponent_div_24_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Type is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function UserManagementComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, UserManagementComponent_div_24_div_1_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r4.newUserForm.controls.usertype.errors.required);
} }
function UserManagementComponent_div_26_p_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "User Registered Successfully!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function UserManagementComponent_div_26_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, "ERROR registering user please make sure the passwords match.");
} }
function UserManagementComponent_div_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, UserManagementComponent_div_26_p_1_Template, 2, 0, "p", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, UserManagementComponent_div_26_ng_template_2_Template, 1, 0, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);
    var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r5.success)("ngIfElse", _r12);
} }
var UserManagementComponent = /** @class */ (function () {
    function UserManagementComponent(api, auth, formBuilder) {
        this.api = api;
        this.auth = auth;
        this.formBuilder = formBuilder;
        this.submitted = false;
        this.success = false;
        this.isDisplay = false;
        this.columnsToDisplay = ['id', 'usertype', 'enrolled'];
    }
    UserManagementComponent.prototype.ngOnInit = function () {
        this.types = ["doctor", "patient", "lab"];
        this.newUserForm = this.formBuilder.group({
            id: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            confirm_password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            usertype: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        this.loadUserList(0);
    };
    UserManagementComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        if (this.newUserForm.invalid) {
            return;
        }
        if (this.newUserForm.controls.password.value != this.newUserForm.controls.confirm_password.value) {
            console.log("the passwords don't match");
            this.success = false;
            return;
        }
        var user = {
            userid: this.newUserForm.controls.id.value,
            password: this.newUserForm.controls.password.value,
            usertype: this.newUserForm.controls.usertype.value,
        };
        console.log(user);
        this.auth.register(user).subscribe(function (res) {
            console.log(JSON.stringify(res));
            _this.success = true;
            _this.enroll(user);
        }, function (error) {
            console.log(JSON.stringify(error));
            _this.success = false;
        });
    };
    UserManagementComponent.prototype.enroll = function (user) {
        var _this = this;
        this.auth.enroll(user).subscribe(function (data) {
            alert("Enrollment was successful. User can log in to be taken to their portal.");
            _this.router.navigate(['/login']);
        }, function (error) {
            console.log(JSON.stringify(error));
            alert("Enrollment failed: " + error['error']['message']);
        });
    };
    UserManagementComponent.prototype.loadUserList = function (tab) {
        var _this = this;
        if (tab == 0) {
            this.api.getAllUsers().subscribe(function (res) {
                var e_1, _a;
                var userArray = Object.keys(res).map(function (userIndex) {
                    var user = res[userIndex];
                    console.log(JSON.stringify(user));
                    return user;
                });
                console.log(userArray);
                var _loop_1 = function (user) {
                    _this.api.id = user.id;
                    _this.api.isUserEnrolled().subscribe(function (res) {
                        // NOTE: adding a new user attribute called enrolled
                        user.enrolled = res;
                    }, function (error) {
                        console.log(JSON.stringify(error));
                    });
                };
                try {
                    for (var userArray_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(userArray), userArray_1_1 = userArray_1.next(); !userArray_1_1.done; userArray_1_1 = userArray_1.next()) {
                        var user = userArray_1_1.value;
                        _loop_1(user);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (userArray_1_1 && !userArray_1_1.done && (_a = userArray_1.return)) _a.call(userArray_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                _this.allUsers = new _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](userArray);
                _this.isDisplay = true;
                console.log("finish new user mattable");
            }, function (error) {
                console.log(JSON.stringify(error));
                alert("Problem loading user list: " + error['error']['message']);
            });
        }
    };
    UserManagementComponent.ɵfac = function UserManagementComponent_Factory(t) { return new (t || UserManagementComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_index__WEBPACK_IMPORTED_MODULE_4__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_index__WEBPACK_IMPORTED_MODULE_4__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"])); };
    UserManagementComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: UserManagementComponent, selectors: [["app-user-management"]], decls: 27, vars: 7, consts: [["id", "user-management"], [2, "display", "table-cell", "width", "100vw"], [1, "formstyle"], [3, "formGroup", "ngSubmit"], [2, "text-align", "left"], ["type", "text", "formControlName", "id"], ["class", "error", 4, "ngIf"], ["type", "password", "formControlName", "password"], ["type", "password", "formControlName", "confirm_password"], ["formControlName", "usertype", "required", "", 1, "form-control"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["type", "submit", "value", "Create User", 1, "form-button", 2, "width", "100%"], ["class", "results", 4, "ngIf"], [1, "error"], [4, "ngIf"], [3, "ngValue"], [1, "results"], [4, "ngIf", "ngIfElse"], ["elseBlock", ""]], template: function UserManagementComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h3");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "User Management Page");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "h3");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "New User Form");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "form", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function UserManagementComponent_Template_form_ngSubmit_7_listener() { return ctx.onSubmit(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "label", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " ID: ");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "input", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, UserManagementComponent_div_11_Template, 2, 1, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "label", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, " Password: ");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "input", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, UserManagementComponent_div_15_Template, 2, 1, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "label", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, " Confirm Password: ");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "input", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, UserManagementComponent_div_19_Template, 2, 1, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "label", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, " Type: ");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "select", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](23, UserManagementComponent_option_23_Template, 2, 2, "option", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, UserManagementComponent_div_24_Template, 2, 1, "div", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](25, "input", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](26, UserManagementComponent_div_26_Template, 4, 2, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.newUserForm);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.newUserForm.controls.id.errors);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.newUserForm.controls.password.errors);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.newUserForm.controls.confirm_password.errors);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.types);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.newUserForm.controls.usertype.errors);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.submitted);
        } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["RequiredValidator"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_x"]], styles: ["#user-management[_ngcontent-%COMP%] {\n  color: #403F4C;\n}\n#user-management[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n#user-management[_ngcontent-%COMP%]   tr.example-element-row[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n}\n#user-management[_ngcontent-%COMP%]   tr.example-element-row[_ngcontent-%COMP%]:active {\n  background: #efefef;\n}\n#user-management[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n}\n#user-management[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], #user-management[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 25px;\n  margin-bottom: 20px;\n  padding: 1em;\n}\n#user-management[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  margin-top: -20px;\n  background: yellow;\n  padding: 0.5em;\n  display: inline-block;\n  font-size: 0.9em;\n  margin-bottom: 20px;\n}\n#user-management[_ngcontent-%COMP%]   .form-button[_ngcontent-%COMP%] {\n  background: #CEEAF7;\n  color: #403F4C;\n  width: 125px;\n  border: 1px white solid;\n  width: 250px;\n  font-size: 75%;\n  text-transform: uppercase;\n  padding: 1em;\n  cursor: pointer;\n  font-family: \"Montserrat\";\n}\n#user-management[_ngcontent-%COMP%]   .form-button[_ngcontent-%COMP%]:hover {\n  background: #77BFA3;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci1tYW5hZ2VtZW50L3VzZXItbWFuYWdlbWVudC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29sb3JzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDRSxjQ0NVO0FESFo7QUFJRTtFQUNFLFdBQUE7QUFGSjtBQUtFO0VBQ0UsbUJBQUE7QUFISjtBQU1FO0VBQ0UsbUJBQUE7QUFKSjtBQU9FO0VBQ0ksY0FBQTtBQUxOO0FBT007RUFDSSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7QUFMVjtBQVFNO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFOVjtBQVVFO0VBQ0UsbUJDekJVO0VEMEJWLGNDcENRO0VEcUNSLFlBQUE7RUFFQSx1QkFBQTtFQUVBLFlBQUE7RUFDQSxjQUFBO0VBRUEseUJBQUE7RUFFQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBWko7QUFlRTtFQUNFLG1CQ3JDVztBRHdCZiIsImZpbGUiOiJzcmMvYXBwL3VzZXItbWFuYWdlbWVudC91c2VyLW1hbmFnZW1lbnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLy4uL2NvbG9ycy5zY3NzJztcblxuXG4jdXNlci1tYW5hZ2VtZW50IHtcbiAgY29sb3I6ICRkYXJrLWdyZXk7XG5cbiAgdGFibGUge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgdHIuZXhhbXBsZS1lbGVtZW50LXJvdzpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcbiAgfVxuXG4gIHRyLmV4YW1wbGUtZWxlbWVudC1yb3c6YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xuICB9XG5cbiAgbGFiZWwge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG5cbiAgICAgIGlucHV0LCB0ZXh0YXJlYSB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiAyNXB4O1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgICAgcGFkZGluZzogMWVtO1xuICAgICAgfVxuXG4gICAgICAuZXJyb3Ige1xuICAgICAgICAgIG1hcmdpbi10b3A6IC0yMHB4O1xuICAgICAgICAgIGJhY2tncm91bmQ6IHllbGxvdztcbiAgICAgICAgICBwYWRkaW5nOiAuNWVtO1xuICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICBmb250LXNpemU6IC45ZW07XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgIH1cbiAgfVxuXG4gIC5mb3JtLWJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogJHBhc3RlbC1ibHVlO1xuICAgIGNvbG9yOiAkZGFyay1ncmV5O1xuICAgIHdpZHRoOiAxMjVweDtcblxuICAgIGJvcmRlcjogMXB4IHdoaXRlIHNvbGlkO1xuICAgIC8vIGJvcmRlci1zdHlsZTogb3V0c2V0O1xuICAgIHdpZHRoOiAyNTBweDtcbiAgICBmb250LXNpemU6IDc1JTtcblxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgLy8gYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIHBhZGRpbmc6IDFlbTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0JztcbiAgfVxuXG4gIC5mb3JtLWJ1dHRvbjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogJGJyaWdodC1ncmVlbjtcbiAgfVxufVxuIiwiXG4vLyBCYWNrZ3JvdW5kXG4kb2ZmLXdoaXRlLWdyZXk6ICNFOEU4RTg7XG4kbGlnaHQtZ3JleTogI0Q4REJFMjtcbiRncmV5OiAjODI4QTk1O1xuJGRhcmstZ3JleTogIzQwM0Y0QztcblxuLy8gTm90aWZpY2F0aW9uIFNlY3Rpb25cbiRjb29sLXRlYWw6ICM0RDdDOEE7XG4kc3RlZWwtdGVhbDogIzYxOUI4QTtcblxuLy8gV2hpdGUgQWNjZW50XG4kZ2hvc3Qtd2hpdGU6ICNGQUZBRkY7XG5cbi8vIEFjY2VudCAjMVxuJHBhc3RlbC1ibHVlOiAjQ0VFQUY3O1xuJGxpZ2h0LXllbGxvdzogI0ZFRkZCRTtcblxuLy8gQWNjZW50ICMyICYgR29vZC9Eb25lIHN0YXR1c1xuJGxpZ2h0LWdyZWVuOiAjQjlEOEMyO1xuJGJyaWdodC1ncmVlbjogIzc3QkZBMztcblxuLy8gV2FybmluZyBDb2xvclxuJHNwYW5pc2gtcGluazogI0VCQkFCOTtcbiRicmlnaHQtcmVkOiAjQjkzMTRGO1xuXG4vLyNFRDZBNUE7IHRlcnJhY290YVxuXG4vLyNCOTMxNEY7IGRpbmd5IGR1bmdlb25cbiJdfQ== */"] });
    return UserManagementComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](UserManagementComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-user-management',
                templateUrl: './user-management.component.html',
                styleUrls: ['./user-management.component.scss'],
            }]
    }], function () { return [{ type: _services_index__WEBPACK_IMPORTED_MODULE_4__["ApiService"] }, { type: _services_index__WEBPACK_IMPORTED_MODULE_4__["AuthService"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/jutarutkongrith/Desktop/HealthSys/application/client/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map