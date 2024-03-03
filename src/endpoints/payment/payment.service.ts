import { Injectable } from '@nestjs/common';
import { CashFreePaymentCreationDto } from './dto/paymentDto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { configService } from 'src/config/config';

@Injectable()
export class PaymentService {
  /**
   * @description This function is used to create a new order id for the payment
   * @param cashFreePaymentCreationDto
   * @returns
   */
  async newOrder(cashFreePaymentCreationDto: CashFreePaymentCreationDto) {
    const url = configService.getCashFreeConfigs().url;
    try {
      const options = {
        method: 'POST',
        url: `${url}/pg/orders`,
        headers: {
          accept: 'application/json',
          'x-api-version': '2022-09-01',
          'content-type': 'application/json',
          'x-client-id': configService.getCashFreeConfigs().appId,
          'x-client-secret': configService.getCashFreeConfigs().secretKey,
        },
        data: {
          customer_details: {
            customer_id: cashFreePaymentCreationDto.customer_id,
            customer_email: cashFreePaymentCreationDto.customer_email,
            customer_phone: cashFreePaymentCreationDto.customer_phone,
            customer_name: cashFreePaymentCreationDto.customer_name,
          },
          order_meta: {
            payment_methods: 'cc,dc,ppc,ccc,emi,paypal,upi,nb,app,paylater',
          },
          order_amount: cashFreePaymentCreationDto.order_amount,
          // order_id:
          order_currency: 'INR',
          order_note: cashFreePaymentCreationDto.order_note,
        },
      };

      let response = await fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: JSON.stringify(options.data),
      });
      response = await response.json();
      return {
        message: 'New Order Id Created Successfully',
        success: true,
        payment_details: response,
        status: 200,
      };
    } catch (error) {
      return {
        message: error.message,
        success: false,
        status: 500,
      };
    }
  }
  /**
   * @description This function is used to check the status of the payment and doing asynchronous operation to process the payment
   * @param orderId
   * @returns
   */
  async checkStatus(orderId: any) {
    const cashFreeConfigs = configService.getCashFreeConfigs();
    const url = cashFreeConfigs.url;
    const appId = cashFreeConfigs.appId;
    const secretKey = cashFreeConfigs.secretKey;

    try {
      const options = {
        method: 'GET',
        url: `${url}/pg/orders/${orderId}`,
        headers: {
          accept: 'application/json',
          'x-api-version': '2022-09-01',
          'x-client-id': appId,
          'x-client-secret': secretKey,
        },
      };

      const response = await fetch(`${url}/pg/orders/${orderId}`, {
        method: options.method,
        headers: options.headers,
      });
      const responseBody = await response.json();
      const x = [];
      x.push(responseBody);
      // console.log(x);
      const orderStatus = x[0].order_status;
      if (orderStatus === 'PAID') {
        return {
          message: 'Payment Successful',
          success: true,
          status: 200,
        };
      } else if (orderStatus === 'ACTIVE') {
        return {
          message: 'Payment Pending',
          success: false,
          status: 205,
        };
      } else {
        return {
          message: 'Payment Failed',
          success: false,
          status: 400,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: error.message,
        success: false,
        status: 500,
      };
    }
  }
  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
