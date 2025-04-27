document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de usuários carregado');

    // Dados de usuários
    let users = [
        {id: '12345', name: 'Carlos Silva', email: 'carlos.silva@policia.gov.br', phone: '(11) 98765-4321', status: 'active'},
        {id: '12346', name: 'Ana Oliveira', email: 'ana.oliveira@policia.gov.br', phone: '(11) 98765-4322', status: 'active'},
        {id: '12347', name: 'Marcos Rocha', email: 'marcos.rocha@policia.gov.br', phone: '(11) 98765-4323', status: 'inactive'},
        {id: '12348', name: 'Juliana Costa', email: 'juliana.costa@policia.gov.br', phone: '(11) 98765-4324', status: 'vacation'}
    ];

    // Elementos do DOM
    const elements = {
        btnNewUser: document.getElementById('btnNewUser'),
        newUserModal: document.getElementById('newUserModal'),
        editUserModal: document.getElementById('editUserModal'),
        userCardsContainer: document.getElementById('userCardsContainer'),
        searchInput: document.getElementById('searchInput'),
        statusSelect: document.getElementById('statusSelect'),
        newUserForm: document.getElementById('newUserForm'),
        editUserForm: document.getElementById('editUserForm'),
        closeNewModal: document.getElementById('closeNewModal'),
        closeEditModal: document.getElementById('closeEditModal'),
        cancelNewUser: document.getElementById('cancelNewUser'),
        cancelEditUser: document.getElementById('cancelEditUser')
    };

    // Verificar elementos críticos
    if (!elements.userCardsContainer) {
        console.error('Container de cards não encontrado!');
        return;
    }

    // ========== FUNÇÕES PRINCIPAIS ========== //

    // Máscara para telefone
    function formatPhone(phone) {
        if (!phone) return '';
        return phone.replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/g, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .substring(0, 15);
    }

    // Inicializar máscaras de telefone
    function initPhoneMasks() {
        const newPhone = document.getElementById('newUserPhone');
        const editPhone = document.getElementById('editUserPhone');
        
        if (newPhone) {
            newPhone.addEventListener('input', function(e) {
                this.value = formatPhone(this.value);
            });
        }
        
        if (editPhone) {
            editPhone.addEventListener('input', function(e) {
                this.value = formatPhone(this.value);
            });
        }
    }

    function openNewUserModal() {
        console.log('Abrindo modal de novo usuário');
        if (!elements.newUserModal) {
            console.error('Modal de novo usuário não encontrado!');
            return;
        }
    
        // Resetar o formulário
        if (elements.newUserForm) {
            elements.newUserForm.reset();
        }
    
        // Mostrar o modal
        elements.newUserModal.style.display = 'flex';
        elements.newUserModal.style.opacity = '1';
        elements.newUserModal.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    
        // Focar no primeiro campo
        setTimeout(() => {
            document.getElementById('newUserName')?.focus();
        }, 100);
    }
    
    // Função para abrir modal de edição
    function openEditUserModal(userId) {
        const user = users.find(u => u.id === userId);
        if (!user) {
            console.error('Usuário não encontrado para edição');
            return;
        }
        
        if (!elements.editUserModal) {
            console.error('Modal de edição não encontrado!');
            return;
        }
        
        // Preenche os campos do formulário
        document.getElementById('editUserId').value = user.id;
        document.getElementById('editUserBadge').value = user.id;
        document.getElementById('editUserName').value = user.name;
        document.getElementById('editUserEmail').value = user.email;
        document.getElementById('editUserPhone').value = user.phone;
        document.getElementById('editUserStatus').value = user.status;
        
        // Mostra o modal
        elements.editUserModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Foca no primeiro campo
        document.getElementById('editUserName')?.focus();
    }

    function closeAllModals() {
        if (elements.newUserModal) elements.newUserModal.style.display = 'none';
        if (elements.editUserModal) elements.editUserModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function initModalEvents() {
        if (elements.btnNewUser) {
            elements.btnNewUser.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Novo Policial clicado - evento capturado');
                openNewUserModal();
            });
        } else {
            console.error('Botão btnNewUser não encontrado!');
        }
        
        // Fechar modais
        const closeButtons = [
            {element: elements.closeNewModal, modal: elements.newUserModal},
            {element: elements.cancelNewUser, modal: elements.newUserModal},
            {element: elements.closeEditModal, modal: elements.editUserModal},
            {element: elements.cancelEditUser, modal: elements.editUserModal}
        ];
        
        closeButtons.forEach(btn => {
            if (btn.element && btn.modal) {
                btn.element.addEventListener('click', function(e) {
                    e.preventDefault();
                    closeAllModals();
                });
            }
        });
        
        // Fechar ao clicar fora do modal
        window.addEventListener('click', function(e) {
            if (elements.newUserModal && e.target === elements.newUserModal) {
                closeAllModals();
            }
            if (elements.editUserModal && e.target === elements.editUserModal) {
                closeAllModals();
            }
        });
    }
    
    // Função para validar formulário
    function validateUserForm(userData, isEdit = false) {
        const errors = [];
        
        if (!userData.name || userData.name.length < 3) {
            errors.push('Nome deve ter pelo menos 3 caracteres');
        }
        
        if (!userData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            errors.push('E-mail institucional inválido');
        } else if (!userData.email.endsWith('@policia.gov.br')) {
            errors.push('O e-mail deve ser institucional (@policia.gov.br)');
        }
        
        if (!userData.phone || userData.phone.replace(/\D/g, '').length < 11) {
            errors.push('Telefone inválido (formato: (00) 00000-0000)');
        }
        
        if (!isEdit && users.some(u => u.email === userData.email)) {
            errors.push('Este e-mail já está cadastrado');
        }
        
        return errors;
    }

    // Inicializar formulários
    function initForms() {
        // Formulário de novo usuário
        if (elements.newUserForm) {
            elements.newUserForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const newUser = {
                    id: document.getElementById('newUserBadge').value,
                    name: document.getElementById('newUserName').value.trim(),
                    email: document.getElementById('newUserEmail').value.trim(),
                    phone: document.getElementById('newUserPhone').value.trim(),
                    status: 'active' // Todos novos usuários são criados como 'active'
                };
                
                const errors = validateUserForm(newUser);
                
                if (errors.length > 0) {
                    alert('Erros encontrados:\n' + errors.join('\n'));
                    return;
                }
                
                users.push(newUser);
                renderUserCards();
                closeAllModals();
                this.reset();
                
                showFeedback('Policial cadastrado com sucesso!', 'success');
            });
        }
        
        // Formulário de edição
        if (elements.editUserForm) {
            elements.editUserForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const userId = document.getElementById('editUserId').value;
                const userIndex = users.findIndex(u => u.id === userId);
                
                if (userIndex === -1) {
                    alert('Usuário não encontrado!');
                    return;
                }
                
                const updatedUser = {
                    id: userId,
                    name: document.getElementById('editUserName').value.trim(),
                    email: document.getElementById('editUserEmail').value.trim(),
                    phone: document.getElementById('editUserPhone').value.trim(),
                    status: document.getElementById('editUserStatus').value
                };
                
                const errors = validateUserForm(updatedUser, true);
                
                if (errors.length > 0) {
                    alert('Erros encontrados:\n' + errors.join('\n'));
                    return;
                }
                
                const emailExists = users.some((u, index) => 
                    u.email === updatedUser.email && index !== userIndex
                );
                
                if (emailExists) {
                    alert('Este e-mail já está cadastrado para outro policial.');
                    return;
                }
                
                users[userIndex] = updatedUser;
                renderUserCards();
                closeAllModals();
                
                showFeedback('Dados do policial atualizados com sucesso!', 'success');
            });
        }
    }

    // Mostrar feedback visual
    function showFeedback(message, type = 'success') {
        const validTypes = ['success', 'info', 'warning', 'error'];
        const feedbackType = validTypes.includes(type) ? type : 'info';
        
        const feedback = document.createElement('div');
        feedback.className = `feedback ${feedbackType}`;
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }

    // Visualizar desempenho do usuário
    function viewPerformance(userId) {
        openPerformanceModal(userId);
    }

    // Renderização de cards (versão simplificada sem descrições)
    function renderUserCards(filteredUsers = null) {
        const usersToRender = filteredUsers || users;
        if (!elements.userCardsContainer) return;
        
        elements.userCardsContainer.innerHTML = '';

        if (usersToRender.length === 0) {
            elements.userCardsContainer.innerHTML = `
                <div class="no-users">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>Nenhum policial encontrado</p>
                </div>
            `;
            return;
        }

        usersToRender.forEach(user => {
            const statusText = getStatusText(user.status);
            const statusClass = getStatusClass(user.status);
            const toggleButtonText = user.status === 'inactive' ? 'Ativar' : 'Desativar';

            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <div class="user-card-header">
                    <div class="user-avatar">
                        ${user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div class="user-info">
                        <div class="user-name-badge">
                            <h3 style="color: #2c3e50;">${user.name}</h3>
                            <small class="badge-number">Matrícula: ${user.id}</small>
                        </div>
                        <span class="user-status ${statusClass}">
                            ${statusText}
                        </span>
                    </div>
                </div>
                <div class="user-details">
                    <p>${user.email}</p>
                    <p>${user.phone}</p>
                </div>
                <div class="user-actions">
                    <button class="btn-performance" data-id="${user.id}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Desempenho
                    </button>
                    <button class="btn-edit" data-id="${user.id}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Editar
                    </button>
                    <button class="btn-toggle" data-id="${user.id}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            ${user.status === 'inactive' ? 
                                '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' :
                                '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'}
                        </svg>
                        ${toggleButtonText}
                    </button>
                </div>
            `;
            elements.userCardsContainer.appendChild(card);
        });

        addCardButtonEvents();
    }

    // Funções auxiliares para renderização
    function getStatusText(status) {
        switch(status) {
            case 'active': return 'Ativo';
            case 'inactive': return 'Inativo';
            case 'vacation': return 'Férias';
            default: return '';
        }
    }

    function getStatusClass(status) {
        switch(status) {
            case 'active': return 'status-active';
            case 'inactive': return 'status-inactive';
            case 'vacation': return 'status-vacation';
            default: return '';
        }
    }

    // Adicionar eventos aos botões dos cards
    function addCardButtonEvents() {
        document.querySelectorAll('.btn-performance').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = this.getAttribute('data-id');
                viewPerformance(userId);
            });
        });

        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = this.getAttribute('data-id');
                openEditUserModal(userId);
            });
        });

        document.querySelectorAll('.btn-toggle').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = this.getAttribute('data-id');
                toggleUserStatus(userId);
            });
        });
    }

    // Alternar status do usuário
    function toggleUserStatus(userId) {
        const user = users.find(u => u.id === userId);
        if (user) {
            const newStatus = user.status === 'inactive' ? 'active' : 'inactive';
            const confirmMessage = `Deseja realmente ${newStatus === 'active' ? 'ativar' : 'desativar'} o policial ${user.name}?`;
            
            if (confirm(confirmMessage)) {
                user.status = newStatus;
                renderUserCards();
                showFeedback(`Policial ${newStatus === 'active' ? 'ativado' : 'desativado'} com sucesso!`, 'info');
            }
        }
    }

    // Inicializar filtros
    function initFilters() {
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', filterUsers);
        }
        
        if (elements.statusSelect) {
            elements.statusSelect.addEventListener('change', function() {
                filterUsers();
            });
        }
    }

    function filterUsers() {
        const searchTerm = elements.searchInput ? elements.searchInput.value.toLowerCase() : '';
        const statusFilter = elements.statusSelect ? elements.statusSelect.value : 'all';

        const filteredUsers = users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm) || 
                                user.id.toLowerCase().includes(searchTerm) || 
                                user.email.toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

            return matchesSearch && matchesStatus;
        });

        renderUserCards(filteredUsers);
    }

    function openPerformanceModal(userId) {
        const user = users.find(u => u.id === userId);
        if (!user) {
            console.error('Usuário não encontrado para visualizar desempenho');
            return;
        }
    
        // Dados de desempenho (simulados)
        const performanceData = {
            overview: {
                totalCases: 187,
                solvedCases: 174,
                resolutionRate: 93,
                avgResponseTime: '2h 15m',
                satisfaction: 4.7,
                monthlyCases: [42, 38, 55, 52]
            },
            cases: {
                types: {
                    theft: 44,
                    robbery: 64,
                    drugTraffic: 19,
                    domesticViolence: 32,
                    other: 28
                },
                resolutionTimeline: [
                    { month: 'Jan', solved: 39, total: 42 },
                    { month: 'Fev', solved: 36, total: 38 },
                    { month: 'Mar', solved: 49, total: 55 },
                    { month: 'Abr', solved: 49, total: 52 }
                ]
            },
            efficiency: {
                indicators: [
                    { name: 'Tempo Médio de Resposta', value: '2h 15m', comparison: '5% mais rápido', trend: 'up' },
                    { name: 'Satisfação da Comunidade', value: '4.7/5', comparison: 'Acima da média', trend: 'up' },
                    { name: 'Casos por Dia', value: '3.2', comparison: 'Média da equipe', trend: 'neutral' },
                    { name: 'Reincidência', value: '12%', comparison: 'Abaixo da média', trend: 'down' }
                ]
            },
            zones: {
                distribution: {
                    central: 58,
                    north: 42,
                    south: 37,
                    east: 31,
                    west: 19
                },
                performance: [
                    { zone: 'Central', resolution: 95, satisfaction: 4.8 },
                    { zone: 'Norte', resolution: 91, satisfaction: 4.5 },
                    { zone: 'Sul', resolution: 89, satisfaction: 4.6 },
                    { zone: 'Leste', resolution: 94, satisfaction: 4.7 },
                    { zone: 'Oeste', resolution: 90, satisfaction: 4.4 }
                ]
            }
        };
    
        // Criar o modal de desempenho
        const performanceModal = document.createElement('div');
        performanceModal.id = 'performanceModal';
        performanceModal.className = 'modal';
        performanceModal.innerHTML = `
            <div class="modal-content performance-content">
                <div class="modal-header">
                    <div class="header-title">
                        <h2>Desempenho Operacional</h2>
                        <div class="user-status-badge ${getStatusClass(user.status)}">${getStatusText(user.status)}</div>
                    </div>
                    <span class="close-modal">&times;</span>
                </div>
                
                <div class="user-profile-header">
                    <div class="profile-avatar">
                        ${user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div class="profile-info">
                        <h3>${user.name}</h3>
                        <p>Matrícula: ${user.id}</p>
                        <div class="profile-stats">
                            <div class="stat-item">
                                <span class="stat-value">${performanceData.overview.totalCases}</span>
                                <span class="stat-label">Ocorrências</span>
                            </div>
                            <div class="stat-item highlight">
                                <span class="stat-value">${performanceData.overview.resolutionRate}%</span>
                                <span class="stat-label">Resolução</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${performanceData.overview.satisfaction}/5</span>
                                <span class="stat-label">Avaliação</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="performance-tabs">
                    <nav class="tab-nav">
                        <button class="tab-btn active" data-tab="overview">
                            <i class="tab-icon">📊</i>
                            Visão Geral
                        </button>
                        <button class="tab-btn" data-tab="cases">
                            <i class="tab-icon">📋</i>
                            Ocorrências
                        </button>
                        <button class="tab-btn" data-tab="efficiency">
                            <i class="tab-icon">⚡</i>
                            Eficiência
                        </button>
                        <button class="tab-btn" data-tab="zones">
                            <i class="tab-icon">🗺️</i>
                            Atuação
                        </button>
                    </nav>
                    
                    <div class="tab-content active" id="overview-tab">
                        <div class="section">
                            <h3 class="section-title">Desempenho Mensal</h3>
                            <div class="monthly-chart-container">
                                ${performanceData.overview.monthlyCases.map((count, index) => `
                                    <div class="month-column">
                                        <div class="month-bar" style="height: ${(count / Math.max(...performanceData.overview.monthlyCases)) * 70}%"></div>
                                        <div class="month-label">${['Jan', 'Fev', 'Mar', 'Abr'][index]}</div>
                                        <div class="month-value">${count}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <div class="metric-value">${performanceData.overview.resolutionRate}%</div>
                                <div class="metric-label">Taxa de Resolução</div>
                                <div class="metric-comparison positive">
                                    <span>+2% acima da média</span>
                                </div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-value">${performanceData.overview.avgResponseTime}</div>
                                <div class="metric-label">Tempo Médio</div>
                                <div class="metric-comparison positive">
                                    <span>15% mais rápido</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="cases-tab">
                        <div class="section">
                            <h3 class="section-title">Distribuição por Tipo</h3>
                            <div class="cases-distribution">
                                ${Object.entries(performanceData.cases.types).map(([type, count]) => `
                                    <div class="case-type">
                                        <div class="case-info">
                                            <span class="case-label">${getCaseTypeLabel(type)}</span>
                                            <span class="case-value">${count}</span>
                                        </div>
                                        <div class="case-bar-container">
                                            <div class="case-bar" style="width: ${(count / performanceData.overview.totalCases) * 100}%"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="section">
                            <h3 class="section-title">Linha do Tempo de Resolução</h3>
                            <div class="timeline-container">
                                ${performanceData.cases.resolutionTimeline.map(item => `
                                    <div class="timeline-item">
                                        <div class="timeline-month">${item.month}</div>
                                        <div class="timeline-bar-container">
                                            <div class="timeline-bar" style="width: ${(item.solved / item.total) * 100}%"></div>
                                        </div>
                                        <div class="timeline-value">${item.solved}/${item.total}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="efficiency-tab">
                        <div class="section">
                            <h3 class="section-title">Indicadores de Eficiência</h3>
                            <div class="indicators-grid">
                                ${performanceData.efficiency.indicators.map(ind => `
                                    <div class="indicator-card ${ind.trend}">
                                        <div class="indicator-name">${ind.name}</div>
                                        <div class="indicator-value">${ind.value}</div>
                                        <div class="indicator-comparison">
                                            <span>${ind.comparison}</span>
                                            <span class="indicator-trend ${ind.trend}">
                                                ${ind.trend === 'up' ? '↑' : ind.trend === 'down' ? '↓' : '→'}
                                            </span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="zones-tab">
                        <div class="section">
                            <h3 class="section-title">Atuação por Zona</h3>
                            <div class="zones-grid">
                                ${performanceData.zones.performance.map(zone => `
                                    <div class="zone-card">
                                        <div class="zone-name">${zone.zone}</div>
                                        <div class="zone-stats">
                                            <div class="zone-stat">
                                                <span class="stat-label">Resolução</span>
                                                <div class="stat-bar-container">
                                                    <div class="stat-bar" style="width: ${zone.resolution}%"></div>
                                                </div>
                                                <span class="stat-value">${zone.resolution}%</span>
                                            </div>
                                            <div class="zone-stat">
                                                <span class="stat-label">Satisfação</span>
                                                <div class="rating-stars">
                                                    ${'★'.repeat(Math.floor(zone.satisfaction))}${'☆'.repeat(5 - Math.floor(zone.satisfaction))}
                                                </div>
                                                <span class="stat-value">${zone.satisfaction}/5</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="btn btn-secondary btn-close">Fechar</button>
                    <button class="btn btn-primary btn-export">
                        <i class="export-icon">📄</i>
                        Exportar Relatório
                    </button>
                </div>
            </div>
        `;
    
        // Adicionar ao DOM
        document.body.appendChild(performanceModal);
        document.body.style.overflow = 'hidden';
    
        // Mostrar o modal com animação
        setTimeout(() => {
            performanceModal.style.opacity = '1';
            performanceModal.style.visibility = 'visible';
        }, 10);
    
        // Adicionar eventos
        performanceModal.querySelector('.close-modal').addEventListener('click', closePerformanceModal);
        performanceModal.querySelector('.btn-close').addEventListener('click', closePerformanceModal);
        performanceModal.querySelector('.btn-export').addEventListener('click', () => {
            showFeedback('Relatório exportado com sucesso!', 'success');
        });
    
        // Adicionar funcionalidade das abas
        const tabButtons = performanceModal.querySelectorAll('.tab-btn');
        const tabContents = performanceModal.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    
        // Fechar ao clicar fora do modal
        performanceModal.addEventListener('click', (e) => {
            if (e.target === performanceModal) {
                closePerformanceModal();
            }
        });
    }
    
    // Funções auxiliares
    function getCaseTypeLabel(type) {
        const labels = {
            theft: 'Furto',
            robbery: 'Roubo',
            drugTraffic: 'Tráfico',
            domesticViolence: 'Violência Doméstica',
            other: 'Outros'
        };
        return labels[type] || type;
    }
    
    // Adicione este CSS para estilizar o novo modal
    function addPerformanceModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .performance-content {
                width: 90%;
                max-width: 900px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                background: #fff;
            }
            
            .modal-header {
                padding: 20px;
                border-bottom: 1px solid #f0f0f0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .header-title {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .user-status-badge {
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
            }
            
            .user-profile-header {
                display: flex;
                padding: 20px;
                gap: 20px;
                align-items: center;
                background: #f9fafb;
                border-bottom: 1px solid #f0f0f0;
            }
            
            .profile-avatar {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                background: linear-gradient(135deg, #1D4ED8, #3B82F6);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                font-weight: bold;
                flex-shrink: 0;
            }
            
            .profile-info {
                flex: 1;
            }
            
            .profile-info h3 {
                margin: 0 0 5px 0;
                font-size: 20px;
                color: #111827;
            }
            
            .profile-info p {
                margin: 0;
                color: #6B7280;
                font-size: 14px;
            }
            
            .profile-stats {
                display: flex;
                gap: 15px;
                margin-top: 10px;
            }
            
            .stat-item {
                text-align: center;
                padding: 8px 12px;
                background: #f3f4f6;
                border-radius: 8px;
                min-width: 70px;
            }
            
            .stat-item.highlight {
                background:#f3f4f6;
                color: white;
            }
            
            .stat-value {
                display: block;
                font-weight: 700;
                font-size: 16px;
            }
            
            .stat-label {
                display: block;
                font-size: 12px;
                opacity: 0.8;
            }
            
            .tab-nav {
                display: flex;
                border-bottom: 1px solid #f0f0f0;
                padding: 0 20px;
            }
            
            .tab-btn {
                padding: 12px 20px;
                background: none;
                border: none;
                border-bottom: 3px solid transparent;
                font-weight: 600;
                color: #6B7280;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.2s;
            }
            
            .tab-btn.active {
                color: #1D4ED8;
                border-bottom-color: #1D4ED8;
            }
            
            .tab-icon {
                font-size: 16px;
            }
            
            .tab-content {
                display: none;
                padding: 20px;
            }
            
            .tab-content.active {
                display: block;
            }
            
            .section {
                margin-bottom: 30px;
            }
            
            .section-title {
                margin: 0 0 15px 0;
                font-size: 16px;
                color: #374151;
                font-weight: 600;
            }
            
            .monthly-chart-container {
                display: flex;
                height: 200px;
                align-items: flex-end;
                gap: 20px;
                margin-bottom: 20px;
            }
            
            .month-column {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .month-bar {
                width: 40px;
                background: #1D4ED8;
                border-radius: 6px 6px 0 0;
                transition: height 0.5s;
            }
            
            .month-label {
                margin-top: 8px;
                font-size: 12px;
                color: #6B7280;
            }
            
            .month-value {
                margin-top: 5px;
                font-weight: 600;
                color: #1E3A8A;
                font-size: 14px;
            }
            
            .metrics-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .metric-card {
                padding: 15px;
                border-radius: 8px;
                background: #f9fafb;
                border: 1px solid #f0f0f0;
            }
            
            .metric-value {
                font-size: 24px;
                font-weight: 700;
                color: #1E3A8A;
                margin-bottom: 5px;
            }
            
            .metric-label {
                font-size: 14px;
                color: #6B7280;
                margin-bottom: 8px;
            }
            
            .metric-comparison {
                font-size: 12px;
            }
            
            .metric-comparison.positive {
                color: #10B981;
            }
            
            .cases-distribution {
                display: grid;
                gap: 12px;
            }
            
            .case-type {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            
            .case-info {
                display: flex;
                justify-content: space-between;
            }
            
            .case-label {
                font-size: 14px;
                color: #4B5563;
            }
            
            .case-value {
                font-weight: 600;
                color: #1E3A8A;
                font-size: 14px;
            }
            
            .case-bar-container {
                height: 8px;
                background: #f0f0f0;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .case-bar {
                height: 100%;
                background: #1D4ED8;
                border-radius: 4px;
            }
            
            .timeline-container {
                display: grid;
                gap: 10px;
            }
            
            .timeline-item {
                display: grid;
                grid-template-columns: 50px 1fr 70px;
                align-items: center;
                gap: 10px;
            }
            
            .timeline-month {
                font-size: 14px;
                color: #4B5563;
            }
            
            .timeline-bar-container {
                height: 8px;
                background: #f0f0f0;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .timeline-bar {
                height: 100%;
                background: #10B981;
                border-radius: 4px;
            }
            
            .timeline-value {
                font-size: 14px;
                font-weight: 600;
                color: #1E3A8A;
                text-align: right;
            }
            
            .indicators-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .indicator-card {
                padding: 15px;
                border-radius: 8px;
                background: #f9fafb;
                border: 1px solid #f0f0f0;
            }
            
            .indicator-card.up {
                border-left: 3px solid #10B981;
            }
            
            .indicator-card.down {
                border-left: 3px solid #EF4444;
            }
            
            .indicator-card.neutral {
                border-left: 3px solid #F59E0B;
            }
            
            .indicator-name {
                font-size: 14px;
                color: #4B5563;
                margin-bottom: 10px;
            }
            
            .indicator-value {
                font-size: 20px;
                font-weight: 700;
                color: #1E3A8A;
                margin-bottom: 8px;
            }
            
            .indicator-comparison {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                color: #6B7280;
            }
            
            .indicator-trend {
                font-weight: bold;
            }
            
            .indicator-trend.up {
                color: #10B981;
            }
            
            .indicator-trend.down {
                color: #EF4444;
            }
            
            .indicator-trend.neutral {
                color: #F59E0B;
            }
            
            .zones-grid {
                display: grid;
                gap: 15px;
            }
            
            .zone-card {
                padding: 15px;
                border-radius: 8px;
                background: #f9fafb;
                border: 1px solid #f0f0f0;
            }
            
            .zone-name {
                font-weight: 600;
                color: #1E3A8A;
                margin-bottom: 10px;
            }
            
            .zone-stats {
                display: grid;
                gap: 10px;
            }
            
            .zone-stat {
                display: grid;
                grid-template-columns: 80px 1fr 50px;
                align-items: center;
                gap: 10px;
            }
            
            .stat-label {
                font-size: 13px;
                color: #6B7280;
            }
            
            .stat-bar-container {
                height: 8px;
                background: #f0f0f0;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .stat-bar {
                height: 100%;
                background: #1D4ED8;
                border-radius: 4px;
            }
            
            .stat-value {
                font-size: 13px;
                font-weight: 600;
                color: #1E3A8A;
                text-align: right;
            }
            
            .rating-stars {
                color: #F59E0B;
                letter-spacing: 2px;
            }
            
            .modal-footer {
                padding: 15px 20px;
                border-top: 1px solid #f0f0f0;
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
            
            .btn {
                padding: 10px 20px;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .btn-secondary {
                background: #f3f4f6;
                color: #4B5563;
                border: none;
            }
            
            .btn-secondary:hover {
                background: #e5e7eb;
            }
            
            .btn-primary {
                background: #1D4ED8;
                color: white;
                border: none;
            }
            
            .btn-primary:hover {
                background: #1E40AF;
            }
        `;
        document.head.appendChild(style);
    }

    function closePerformanceModal() {
        const modal = document.getElementById('performanceModal');
        if (modal) {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
            
            // Remover após a animação
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .feedback {
                position: fixed;
                bottom: 24px;
                right: 24px;
                padding: 14px 28px;
                border-radius: 10px;
                color: #fff;
                font-weight: 600;
                box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: fadeSlideIn 0.4s ease-out;
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 15px;
            }
    
            .feedback.success {
                background: linear-gradient(135deg, #22C55E, #16A34A);
            }
    
            .feedback.info {
                background: linear-gradient(135deg, #3B82F6, #2563EB);
            }
    
            .user-card {
                background: #fff;
                border-radius: 16px;
                padding: 20px 20px 20px 26px;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                position: relative;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                background-clip: padding-box;
            }
    
            .user-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 6px;
                background: linear-gradient(180deg, #1D4ED8, #3B82F6);
                border-top-left-radius: 16px;
                border-bottom-left-radius: 16px;
            }
    
            .user-card:hover {
                transform: translateY(-6px);
                box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
            }
    
            .user-card-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;
            }
    
            .user-avatar {
                width: 52px;
                height: 52px;
                border-radius: 50%;
                background: linear-gradient(135deg, #1D4ED8, #2563EB);
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 20px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                margin-right: 18px;
                flex-shrink: 0;
            }
    
            .user-info {
                flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
            }
    
            .user-name-badge {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
    
            .user-name-badge h3 {
                margin: 0;
                font-size: 18px;
                font-weight: 700;
                color: #111827;
            }
    
            .user-name-badge .badge-number {
                display: block;
                margin-top: 4px;
                font-size: 13px;
                color: #6B7280;
            }
    
            .user-status {
                padding: 6px 12px;
                border-radius: 14px;
                font-size: 12px;
                font-weight: 600;
                display: flex;
                align-items: center;
            }
    
            .status-active {
                background: #1D4ED8;
                color: white;
            }
    
            .status-inactive {
                background: #EF4444;
                color: white;
            }
    
            .status-vacation {
                background: #F59E0B;
                color: white;
            }
    
            .user-details {
                margin: 6px 0;
                font-size: 14px;
                color: #4B5563;
            }
    
            .user-details p {
                margin: 4px 0;
            }
    
            .user-actions {
                display: flex;
                gap: 10px;
                margin-top: 14px;
            }
    
            .user-actions button {
                flex: 1;
                padding: 10px 14px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                font-size: 14px;
                font-weight: 600;
                transition: background-color 0.2s, color 0.2s;
            }
    
            .btn-performance {
                background: #EFF6FF;
                color: #2563EB;
            }
    
            .btn-performance:hover {
                background: #2563EB;
                color: #fff;
            }
    
            .btn-edit {
                background: #EEF2FF;
                color: #4F46E5;
            }
    
            .btn-edit:hover {
                background: #4F46E5;
                color: #fff;
            }
    
            .btn-toggle {
                background: #F3F4F6;
                color: #4B5563;
            }
    
            .btn-toggle:hover {
                background: #EF4444;
                color: #fff;
            }
    
            .btn-toggle.inactive:hover {
                background: #10B981;
                color: #fff;
            }
    
            .user-actions button svg {
                width: 16px;
                height: 16px;
            }
    
            .no-users {
                text-align: center;
                padding: 50px;
                color: #6B7280;
                grid-column: 1 / -1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
    
            .no-users svg {
                margin-bottom: 20px;
                color: #D1D5DB;
                width: 48px;
                height: 48px;
            }
    
            .no-users p {
                font-size: 18px;
                color: #6B7280;
                margin-top: 10px;
            }
    
            @keyframes fadeSlideIn {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }

            /* Estilos para o modal de desempenho */
            .modal {
                display: flex;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s, visibility 0.3s;
            }
            
            .modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .performance-content {
                background-color: white;
                border-radius: 16px;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                animation: modalFadeIn 0.3s ease-out;
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .modal-header {
                padding: 20px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h2 {
                margin: 0;
                color: #1E3A8A;
                font-size: 22px;
            }
            
            .close-modal {
                font-size: 28px;
                cursor: pointer;
                color: #6B7280;
                transition: color 0.2s;
            }
            
            .close-modal:hover {
                color: #1E3A8A;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .performance-user-info {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .performance-avatar {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #1D4ED8, #2563EB);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 24px;
                margin-right: 16px;
            }
            
            .performance-user-info h3 {
                margin: 0 0 4px 0;
                color: #111827;
            }
            
            .performance-user-info p {
                margin: 0;
                color: #6B7280;
                font-size: 14px;
            }
            
            .performance-section {
                margin-bottom: 24px;
            }
            
            .performance-section h3 {
                margin: 0 0 12px 0;
                color: #374151;
                font-size: 16px;
                font-weight: 600;
            }
            
            .performance-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 24px;
            }
            
            .performance-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #f0f0f0;
            }
            
            .performance-label {
                color: #4B5563;
                font-size: 14px;
            }
            
            .performance-value {
                color: #1E3A8A;
                font-weight: bold;
                font-size: 15px;
            }
            
            .performance-months {
                display: flex;
                gap: 12px;
            }
            
            .month {
                background: #F3F4F6;
                padding: 8px 12px;
                border-radius: 8px;
                color: #4B5563;
                font-size: 14px;
                font-weight: 500;
            }
            
            .modal-footer {
                padding: 16px 20px;
                border-top: 1px solid #eee;
                display: flex;
                justify-content: flex-end;
                gap: 12px;
            }
            
            .modal-footer button {
                padding: 10px 20px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .btn-close {
                background: #F3F4F6;
                color: #4B5563;
                border: none;
            }
            
            .btn-close:hover {
                background: #E5E7EB;
            }
            
            .btn-export {
                background: #1D4ED8;
                color: white;
                border: none;
            }
            
            .btn-export:hover {
                background: #1E40AF;
            }
        `;
        document.head.appendChild(style);
    }

    // Inicialização do sistema
    function init() {
        addDynamicStyles();
        initPhoneMasks();
        initModalEvents();
        initForms();
        initFilters();
        renderUserCards();
        addPerformanceModalStyles();
        
        console.log('Sistema de gestão de usuários inicializado com sucesso');
    }
    
    init();
});