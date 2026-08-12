# syntax=docker/dockerfile:1

# ---- build: compile the Vite SPA ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite inlines VITE_* values at build time, so they must be present now.
# These are client-side/public values (not server secrets).
ARG VITE_API_URL=""
ARG VITE_RAZORPAY_KEY_ID=""
ARG VITE_WHMCS_URL=""
ARG VITE_WHMCS_PID_STARTER=""
ARG VITE_WHMCS_PID_PRO=""
ARG VITE_WHMCS_PID_BUSINESS=""
ARG VITE_WHMCS_PID_WP_STARTER=""
ARG VITE_WHMCS_PID_WP_PRO=""
ARG VITE_WHMCS_PID_WP_BUSINESS=""
ARG VITE_SUPPORT_PHONE=""

ENV VITE_API_URL=$VITE_API_URL \
    VITE_RAZORPAY_KEY_ID=$VITE_RAZORPAY_KEY_ID \
    VITE_WHMCS_URL=$VITE_WHMCS_URL \
    VITE_WHMCS_PID_STARTER=$VITE_WHMCS_PID_STARTER \
    VITE_WHMCS_PID_PRO=$VITE_WHMCS_PID_PRO \
    VITE_WHMCS_PID_BUSINESS=$VITE_WHMCS_PID_BUSINESS \
    VITE_WHMCS_PID_WP_STARTER=$VITE_WHMCS_PID_WP_STARTER \
    VITE_WHMCS_PID_WP_PRO=$VITE_WHMCS_PID_WP_PRO \
    VITE_WHMCS_PID_WP_BUSINESS=$VITE_WHMCS_PID_WP_BUSINESS \
    VITE_SUPPORT_PHONE=$VITE_SUPPORT_PHONE

RUN npm run build

# ---- runtime: serve static assets + reverse-proxy the API ----
FROM nginx:1.27-alpine AS runtime
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1
