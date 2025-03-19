import { AddForm, EditForm } from "../list-aggregator/interface/list-aggregator.interface";

export class FormValidator {
    static validateAggregatorForm(data: AddForm): string[] {
      const errors: string[] = [];
      if (!data.aggregator_name?.trim()) errors.push('Aggregator name is required.');
      if (!data.api_key?.trim()) errors.push('API key is required.');
      if (!data.secret_key?.trim()) errors.push('Secret key is required.');
      if (!data.endpoint_url?.trim()) errors.push('Endpoint URL is required.');
      return errors;
    }
  }


  export class FormDataBuilder {
    static prepareAggregatorDataForAdd(formData: Partial<AddForm>): AddForm {
      return {
        aggregator_name: formData.aggregator_name || '',
        api_key: formData.api_key || '',
        secret_key: formData.secret_key || '',
        endpoint_url: formData.endpoint_url || '',
        status: formData.status || 'active',
        updated_by: 'admin_user',
        created_by: 'admin_user',
        auto_order_confirm: formData.auto_order_confirm || false,
      };
    }
    static prepareAggregatorDataForEdit(formData: Partial<EditForm>): EditForm {
      return {
        id : formData.id || '',
        aggregator_name: formData.aggregator_name || '',
        api_key: formData.api_key || '',
        secret_key: formData.secret_key || '',
        endpoint_url: formData.endpoint_url || '',
        status: formData.status || 'active',
        updated_by: 'admin_user',
        created_by: 'admin_user',
        auto_order_confirm: formData.auto_order_confirm || false,
      };
    }
  }

  export function  isChangesHappen<T extends Record<string, any>>(prevData: T, newData: T): number {
    let changesCounter = 0;
    if (newData) {
      for (const key in newData) {
        if (prevData[key] !== newData[key]) {
          changesCounter++;
        }
      }
    }
    return changesCounter;
  }


  