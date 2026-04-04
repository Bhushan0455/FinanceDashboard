import { useState, useEffect } from "react";
import { X } from "lucide-react";

// Available categories — same list used across the app
const CATEGORIES = [
  "Salary",
  "Freelance",
  "Food",
  "Transport",
  "Bills",
  "Shopping",
  "Housing",
  "Entertainment",
  "Health",
];

// Default empty form values (used for ADD mode)
const EMPTY_FORM = {
  date: "",
  description: "",
  category: "Food",
  type: "expense",
  amount: "",
};

function AddEditTransactionModal({ isOpen, onClose, onSave, transaction }) {
  // ── Form State ────────────────────────────────────────────
  // Each field is a controlled input — its value comes from state
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Determine mode based on whether a transaction was passed
  const isEditMode = transaction !== null;

  // ── Initialize form when modal opens or transaction changes ──
  // In EDIT mode: populate form with the existing transaction's values
  // In ADD mode: reset to empty defaults
  useEffect(() => {
    if (transaction) {
      // EDIT: fill form with existing data
      setFormData({
        date: transaction.date,
        description: transaction.description,
        category: transaction.category,
        type: transaction.type,
        amount: String(transaction.amount), // input needs a string
      });
    } else {
      // ADD: start fresh
      setFormData(EMPTY_FORM);
    }
    setErrors({}); // clear any previous validation errors
  }, [transaction]);

  // ── Handle input changes ──────────────────────────────────
  // One handler for all fields — uses the input's `name` attribute
  // to know which field to update
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ── Basic Validation ──────────────────────────────────────
  // Returns true if valid, false if there are errors
  const validate = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Enter a valid amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // no errors = valid
  };

  // ── Handle Submit ─────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    if (!validate()) return; // stop if validation fails

    // Build the data object to send to the parent
    const savedData = {
      ...formData,
      amount: Number(formData.amount), // convert string back to number
    };

    // If editing, include the original id so parent knows which to update
    if (isEditMode) {
      savedData.id = transaction.id;
    }

    onSave(savedData);  // parent handles add/update logic
    onClose();          // close the modal
  };

  // ── Don't render if closed ────────────────────────────────
  if (!isOpen) return null;

  // Shared input styling
  const inputClass =
    "w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200 shadow-sm dark:shadow-none";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1.5";
  const errorClass = "text-xs text-red-500 dark:text-red-400 mt-1";

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ── Modal Panel ── */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700/50 shadow-2xl"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isEditMode ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <button
              id="modal-close"
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {/* Date */}
            <div>
              <label htmlFor="modal-date" className={labelClass}>Date</label>
              <input
                id="modal-date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.date && <p className={errorClass}>{errors.date}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="modal-description" className={labelClass}>Description</label>
              <input
                id="modal-description"
                type="text"
                name="description"
                placeholder="e.g. Grocery Store"
                value={formData.description}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.description && <p className={errorClass}>{errors.description}</p>}
            </div>

            {/* Type & Category — side by side */}
            <div className="grid grid-cols-2 gap-3">
              {/* Type */}
              <div>
                <label htmlFor="modal-type" className={labelClass}>Type</label>
                <select
                  id="modal-type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="modal-category" className={labelClass}>Category</label>
                <select
                  id="modal-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="modal-amount" className={labelClass}>Amount ($)</label>
              <input
                id="modal-amount"
                type="number"
                name="amount"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.amount && <p className={errorClass}>{errors.amount}</p>}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                id="modal-cancel"
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-transparent transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="modal-save"
                type="submit"
                className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 cursor-pointer"
              >
                {isEditMode ? "Save Changes" : "Add Transaction"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEditTransactionModal;
