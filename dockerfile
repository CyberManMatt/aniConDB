FROM node:24-bullseye

# Install OpenSSH and set up SSH
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssh-server \
    && echo "root:Docker!" | chpasswd \
    && mkdir -p /run/sshd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

# Copy SSH configuration
COPY sshd_config /etc/ssh/sshd_config

# Copy and set permissions for entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8080 2222

# Use entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
