const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const excel = require("exceljs");
const formConfig = require("../config/form.config");
const imageConfig = require("../config/image.config");

//TODO images are disabled
// const workbookPath = process.env.DATA_DIR + "/" + process.env.WORKBOOK_NAME;
// if (!fs.existsSync(workbookPath)) {
//   throw { message: `Could not find workbook at ${workbookPath}` }
// }

s3 = new AWS.S3({ apiVersion: '2006-03-01' });

exports.validateImageExt = (fileName) => {
  const ext = path.extname(fileName).toLowerCase();

  return imageConfig.acceptableExtensions.includes(ext);
}

exports.uploadImage = async (req, res) => {
  const tempPath = req.file.path;
  const fileName = req.file.originalname;

  const location = this.uploadToS3(tempPath, fileName, 'img');

  return location;
}

exports.uploadExcel = async () => {
  const location = this.uploadToS3(workbookPath, process.env.WORKBOOK_NAME, null);

  return location;
}

exports.uploadToS3 = async (filePath, fileName, key) => {
  const file = await fs.promises.readFile(filePath);

  if (!key) {
    key = '/';
  } else {
    key = '/' + key + '/';
  }

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: process.env.UPLOAD_DIR + key + fileName,
    Body: file
  };

  const data = await s3.upload(params).promise();

  return data.Location;
}

validateField = (form, validation) => {
  const field = validation.field;
  const size = validation.size;
  const includes = validation.includes;
  const dependent = validation.dependent;
  const dependentValue = validation.dependentValue;

  const value = form[field];
  const readableField = formConfig.humanReadableFields[field];

  if (!value)
    return readableField + " is required.";

  if (value.trim().length < size)
    return readableField + " must be at least " + size + " characters.";

  if (includes && !includes.includes(value))
    return "Invalid " + readableField + " " + value;

  if (dependentValue && value.toLowerCase() === dependentValue) {
    const r = validateField(form, dependent);
    if (r)
      return readableField + " equals " + dependentValue + " so " + r;
  }
}

exports.validateForm = (form) => {
  for (const validation of formConfig.fieldValidations) {
    const r = validateField(form, validation);
    if (r) {
      return r;
    }
  }

  //Validations by form type
  if (form.productType === "Report" || form.productType === "Dashboard" || form.productType === "Webservice (API)") {
    const r = validateField(form, { field: "productURL", size: 10 })
    if (r)
      return r;
  }

  // // TODO Other type is disabled
  // // Skip other validations if type is other
  // if (form.productType === "Other") {
  //   if (!form.otherDesc) {
  //     return "Other type was selected by no other description was provided.";
  //   }
  //   return;
  // }

  // // TODO images temporarily disabled
  // if (form.productType === "Report" || form.productType === "Dashboard") {
  //   const r = validateField(form, { field: "imageConfirm", size: 0, dependent: { field: "productImg", size: 0 }, dependentValue: "true" });
  //   if (r)
  //     return r;
  // }
}

exports.saveFormToExcel = async (form) => {
  const workbook = new excel.Workbook();

  try {
    await workbook.xlsx.readFile(workbookPath);
  } catch (err) {
    console.log("Error reading Excel: ", err);
    throw err;
  }

  const worksheet = workbook.getWorksheet("New Products");
  let row = 2;
  let maxId = 0;
  while (worksheet.getCell(row, 1).value) {
    maxId = Math.max(worksheet.getCell(row, 1).value, maxId);
    row++;
  }

  form.id = maxId + 1;

  //Write all available properties in the form.
  for (const property in form) {
    if (formConfig.fieldPositions[property]) {
      worksheet.getCell(`${formConfig.fieldPositions[property]}${row}`).value = form[property];
    }
  }

  try {
    await workbook.xlsx.writeFile(workbookPath);
  } catch (err) {
    console.log("Error writing Excel: ", err);
    throw err;
  }

  return form;
}