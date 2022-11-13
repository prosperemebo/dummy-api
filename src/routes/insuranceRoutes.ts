import { Router } from 'express';
import {
  createInsurance,
  deleteInsurance,
  getAllInsurance,
  getInsurance,
  getInsurancePolicy,
  updateInsurance,
} from '../controllers/insuranceController';

const router: Router = Router();

router.get('/policy/:id', getInsurancePolicy);

router.route('/').get(getAllInsurance).post(createInsurance);

router
  .route('/:id')
  .get(getInsurance)
  .patch(updateInsurance)
  .delete(deleteInsurance);

export { router as insuranceRouter };
