# --- Stage 1: build ---
FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

# Se quiser instalar dependências de dev para rodar `nest build`:
# RUN npm install

COPY . .

# Transpila o código (gera dist/)
RUN npm run build

# --- Stage 2: runtime ---
FROM node:18 AS runner

WORKDIR /usr/src/app

# Copia apenas o resultado do build e os node_modules de prod
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./

# Exponha a porta
EXPOSE 3000

CMD ["npm", "run", "start:prod"]
