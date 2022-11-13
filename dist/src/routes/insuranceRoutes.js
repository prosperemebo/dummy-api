"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insuranceRouter = void 0;
const express_1 = require("express");
const insuranceController_1 = require("../controllers/insuranceController");
const router = (0, express_1.Router)();
exports.insuranceRouter = router;
router.get('/policy/:id', insuranceController_1.getInsurancePolicy);
router.route('/').get(insuranceController_1.getAllInsurance).post(insuranceController_1.createInsurance);
router
    .route('/:id')
    .get(insuranceController_1.getInsurance)
    .patch(insuranceController_1.updateInsurance)
    .delete(insuranceController_1.deleteInsurance);
