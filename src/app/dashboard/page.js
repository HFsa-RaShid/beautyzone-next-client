"use client";
import React from 'react'
import DashboardProductsPage from './products/page'
import DashboardOrdersPage from './orders/page';

export default function page() {
  return (
    <div>

        <DashboardProductsPage></DashboardProductsPage>
        <DashboardOrdersPage></DashboardOrdersPage>
    </div>
  )
}
