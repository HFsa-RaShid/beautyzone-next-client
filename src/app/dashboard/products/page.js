"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import useAllProducts from "@/Hooks/useAllProducts"; // আপনার পাথ অনুযায়ী
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import AddProductModal from "./components/AddProductModal";
import UpdateProductModal from "./components/UpdateProductModal";

const DashboardProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const axiosPublic = useAxiosPublic();
  
  const { allProducts, isLoading, refetch } = useAllProducts(page, 12);

  const products = allProducts?.data?.products || [];
  const totalPages = allProducts?.data?.totalPages || 1;
  const totalProducts = allProducts?.data?.totalItems || 0;

  // Metrics Calculation
  const lowStock = products.filter((p) => p.stock < 10).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/api/products/${id}`);
          refetch();
          Swal.fire('Deleted!', 'Product has been removed.', 'success');
        } catch (error) {
          console.error(error);
          Swal.fire('Error!', 'Failed to delete product.', 'error');
        }
      }
    });
  };

  if (isLoading) return <div className="p-10 text-center font-bold">Loading...</div>;

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-6 py-2 rounded-lg font-medium w-full sm:w-auto hover:bg-gray-800 transition">
          + Add Product
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Products", value: totalProducts },
          { label: "Low Stock", value: lowStock },
          { label: "Out of Stock", value: outOfStock },
          { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}` }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 md:p-6 rounded-2xl border shadow-sm">
            <p className="text-gray-500 text-xs md:text-sm">{stat.label}</p>
            <p className="text-xl md:text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase">
              <tr>
                <th className="p-5">ID</th>
                <th className="p-5">Thumbnail</th>
                <th className="p-5">Name</th>
                <th className="p-5">Price</th>
                <th className="p-5">Stock</th>
                <th className="p-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-5 font-mono text-gray-500">#{p._id?.slice(-5)}</td>
                  <td className="p-5">
                    <div className="relative w-12 h-12">
                      <Image src={p.images?.[0]} alt={p.name} fill className="rounded-lg object-cover" sizes="48px" />
                    </div>
                  </td>
                  <td className="p-5 font-semibold">{p.name}</td>
                  <td className="p-5">${p.price}</td>
                  <td className="p-5">{p.stock}</td>
                  <td className="p-5 flex gap-4 text-gray-400">
                    <button onClick={() => { setSelectedProduct(p); setIsUpdateModalOpen(true); }} className="hover:text-blue-600"><FiEdit size={18} /></button>
                    <button onClick={() => handleDelete(p._id)} className="hover:text-red-600"><FiTrash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-5 border-t">
          <p className="text-xs text-gray-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)} className="px-3 py-1 border rounded text-sm disabled:opacity-50">Prev</button>
            <button disabled={page === totalPages} onClick={() => setPage(prev => prev + 1)} className="px-3 py-1 border rounded text-sm disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddProductModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); refetch(); }} />
      <UpdateProductModal isOpen={isUpdateModalOpen} product={selectedProduct} onClose={() => setIsUpdateModalOpen(false)} refetch={refetch} />
    </div>
  );
};

export default DashboardProductsPage;