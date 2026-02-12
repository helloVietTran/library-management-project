export default function convertToFormData(formValues: Record<string, any>): FormData {
  const formData = new FormData();

  Object.entries(formValues).forEach(([key, value]) => {
    if (value == null) return; // skip null/undefined

    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {

      value.forEach((item) => {
        formData.append(key, String(item));
      });
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
}