##############################################################################
# Stage 0:  Installing Alpine Linux

FROM node:20.17.0-alpine3.20@sha256:2d07db07a2df6830718ae2a47db6fedce6745f5bcd174c398f2acdda90a11c03

##############################################################################
# Stage 1:  Setup Environment 

ENV PORT=8080
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false#  
ENV NODE_ENV=production

# Define the working directory
#   - Use the /app as our working directory
WORKDIR /app

##############################################################################
# Stage 2:  Installing Dependencies

COPY package.json package-lock.json ./
RUN npm ci --only=production

##############################################################################
# Stage 3:  Copy Source Code

COPY ./src ./src
COPY ./tests/.htpasswd ./tests/.htpasswd

##############################################################################
# Stage 4:  Metadata

LABEL maintainer="Mansoor Zafar <mansoorwork980@gmail.com>"
LABEL description="Inventory node.js microservice"

##############################################################################
# Stage 5:  Building the Microservice

EXPOSE ${PORT}
HEALTHCHECK --interval=3m \
      CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT} || exit 1

CMD ["npm", "start"]

##############################################################################
