An Example of a Register Option


{
            required: {
              value: isOptional ? false : true,
              message: `${title || "This feild"} is required.`,
            },
            pattern: {
              value:
                camelCase === "mobileNumber" || camelCase === "phoneNumber"
                  ? // ||
                    // camelCase === "account_code"
                    /^[-+]?[0-9]+$/
                  : camelCase === "emailAddress"
                  ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                  : camelCase.includes("Commission") === true
                  ? /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/
                  : camelCase === "bank_name"
                  ? /^[a-zA-Z\s]*$/g
                  : camelCase === "amount"
                  ? /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/
                  : "",
              message:
                camelCase === "mobileNumber" ||
                camelCase === "phoneNumber" ||
                // camelCase === "account_code" ||
                camelCase === "amount"
                  ? `${camelCase === "mobileNumber" ? "Mobile Number" : ""} ${
                      camelCase === "phoneNumber" ? "Phone Number" : ""
                    } ${camelCase === "account_code" ? "Account Code" : ""} ${
                      camelCase === "amount" ? "Amount" : ""
                    } must include only numbers.`
                  : camelCase === "emailAddress"
                  ? "Incorrect Email format."
                  : camelCase.includes("Commission") === true
                  ? "Enter only numbers"
                  : camelCase === "bank_name"
                  ? "Bank must include only alphabets"
                  : "",
            },
            minLength: {
              value:
                camelCase === "mobileNumber" || camelCase === "phoneNumber"
                  ? 11
                  : null,
              message: "Phone Number must be of atleast 11 digits.",
            },

            maxLength: {
              value:
                camelCase === "mobileNumber" || camelCase === "phoneNumber"
                  ? 15
                  : null,
              message: "Phone Number must not be more than 15 digits.",
            },

            max: {
              value: maxVal ? maxVal : null,
              message: `${
                title || "This feild"
              } must not be more than ${maxVal}${maxValDis || "%"}`,
            },
            min: {
              value: minVal ? minVal : null,
              message: `${
                title || "This feild"
              } must not be less than ${minVal}${minValDis || "%"}`,
            },



}