-- Migration: Remove Price Columns
-- Description: Drops 'price' from products and order_items, and 'total' from orders.

-- 1. Remove price from products
ALTER TABLE public.products DROP COLUMN IF EXISTS price;

-- 2. Remove price from order_items
ALTER TABLE public.order_items DROP COLUMN IF EXISTS price;

-- 3. Remove total from orders
ALTER TABLE public.orders DROP COLUMN IF EXISTS total;
