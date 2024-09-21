import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useSelector } from "react-redux";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "antd";

const MobileFilter = ({
  mobileFiltersOpen = false,
  setMobileFiltersOpen,
  handleOnCategoryFilter,
  handleSubCatFilter,
}) => {
  const { categories, brands, materials } = useSelector(
    (state) => state.categories
  );
  const { filteredProducts, activeFilters } = useSelector(
    (state) => state.products
  );

  return (
    <Dialog
      open={mobileFiltersOpen}
      onClose={() => setMobileFiltersOpen(false)}
      className="relative z-50 lg:hidden"
    >
      <Dialog.Panel className="px-4 relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white dark:bg-gray-900 py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Filters
          </DialogTitle>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-white dark:bg-gray-800 p-2 text-gray-400 dark:text-gray-300"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* Categories */}
        <Disclosure
          as="div"
          className="border-b border-gray-200 dark:border-gray-700 py-6"
          defaultOpen
        >
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-light dark:bg-dark py-3 text-sm text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-gray-300">
                Categories
              </span>
              <span className="ml-6 flex items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="h-5 w-5 group-data-[open]:hidden"
                />
                <MinusIcon
                  aria-hidden="true"
                  className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {categories?.map((item) => (
                <div key={item._id} className="flex items-center">
                  <Checkbox
                    checked={activeFilters["category"]?.includes(item._id)}
                    onChange={() => handleOnCategoryFilter(item._id)}
                  >
                    {item.title}
                  </Checkbox>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>

        {/* Brand */}
        <Disclosure
          as="div"
          className="border-b border-gray-200 dark:border-gray-700 py-6"
          defaultOpen
        >
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-light dark:bg-dark py-3 text-sm text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-gray-300">
                Brand
              </span>
              <span className="ml-6 flex items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="h-5 w-5 group-data-[open]:hidden"
                />
                <MinusIcon
                  aria-hidden="true"
                  className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {brands
                ?.filter(
                  (brand) =>
                    filteredProducts[0]?.categoryId === brand.categoryId
                )
                ?.map((item) => (
                  <div key={item._id} className="flex items-center">
                    <Checkbox
                      checked={activeFilters["brandId"]?.includes(item._id)}
                      onChange={() => handleSubCatFilter(item._id)}
                    >
                      {item.name}
                    </Checkbox>
                  </div>
                ))}
            </div>
          </DisclosurePanel>
        </Disclosure>

        {/* Material */}
        <Disclosure
          as="div"
          className="border-b border-gray-200 dark:border-gray-700 py-6"
          defaultOpen
        >
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-light dark:bg-dark py-3 text-sm text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-gray-300">
                Material Type
              </span>
              <span className="ml-6 flex items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="h-5 w-5 group-data-[open]:hidden"
                />
                <MinusIcon
                  aria-hidden="true"
                  className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {materials?.map((item) => (
                <div key={item._id} className="flex items-center">
                  <Checkbox
                    checked={activeFilters["material"]?.includes(item._id)}
                    onChange={() => handleSubCatFilter(item._id)}
                  >
                    {item.name}
                  </Checkbox>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      </Dialog.Panel>
    </Dialog>
  );
};

export default MobileFilter;
