import { useMemo } from 'react';

// ============================================
// TABLAS DE MULTAS SUNAFIL OFICIALES (montos en soles)
// ============================================

// Valor UIT vigente 2026
export const UIT_VALUE = 5500;

// Tabla de multas para microempresas (en soles)
// Columnas: número de trabajadores (1-10 y más)
// Filas: Leve, Grave, Muy Grave
const TABLA_MULTAS_MICRO: Record<string, { Leves: number; Grave: number; 'Muy Grave': number }> = {
    '1': { Leves: 240.75, Grave: 588.50, 'Muy Grave': 1230.50 },
    '2': { Leves: 267.50, Grave: 749.00, 'Muy Grave': 1337.50 },
    '3': { Leves: 374.50, Grave: 856.00, 'Muy Grave': 1551.50 },
    '4': { Leves: 428.00, Grave: 963.00, 'Muy Grave': 1712.00 },
    '5': { Leves: 481.50, Grave: 1070.00, 'Muy Grave': 1926.00 },
    '6': { Leves: 588.50, Grave: 1337.50, 'Muy Grave': 2193.50 },
    '7': { Leves: 749.00, Grave: 1551.50, 'Muy Grave': 2514.50 },
    '8': { Leves: 856.00, Grave: 1819.00, 'Muy Grave': 2889.00 },
    '9': { Leves: 963.00, Grave: 2033.00, 'Muy Grave': 3263.50 },
    '10 y más': { Leves: 1230.50, Grave: 2407.50, 'Muy Grave': 3638.00 }
};

// Tabla de multas para pequeñas empresas (en soles)
const TABLA_MULTAS_PEQUENA: Record<string, { Leves: number; Grave: number; 'Muy Grave': number }> = {
    '1 a 5': { Leves: 481.50, Grave: 2407.50, 'Muy Grave': 4440.50 },
    '6 a 10': { Leves: 749.00, Grave: 3156.50, 'Muy Grave': 6742.00 },
    '11 a 20': { Leves: 963.00, Grave: 4120.50, 'Muy Grave': 8827.50 },
    '21 a 30': { Leves: 1230.50, Grave: 5189.50, 'Muy Grave': 11449.00 },
    '31 a 40': { Leves: 1712.00, Grave: 6742.00, 'Muy Grave': 14817.50 },
    '41 a 50': { Leves: 2407.50, Grave: 8078.50, 'Muy Grave': 17912.50 },
    '51 a 60': { Leves: 3263.50, Grave: 10700.00, 'Muy Grave': 23754.00 },
    '61 a 70': { Leves: 4440.50, Grave: 13321.50, 'Muy Grave': 29634.00 },
    '71 a 99': { Leves: 5403.50, Grave: 16328.50, 'Muy Grave': 35310.00 },
    '100 y más': { Leves: 12037.50, Grave: 24167.50, 'Muy Grave': 61840.50 }
};

// Tabla de multas generales (no MYPE) - en UITs, convertimos a soles
const TABLA_MULTAS_GENERAL_UIT: Record<string, { Leves: number; Grave: number; 'Muy Grave': number }> = {
    '1-10': { Leves: 0.13, Grave: 0.45, 'Muy Grave': 0.94 },
    '11-25': { Leves: 0.38, Grave: 1.58, 'Muy Grave': 3.16 },
    '26-50': { Leves: 0.61, Grave: 6.46, 'Muy Grave': 10.61 },
    '51-100': { Leves: 1.04, Grave: 10.70, 'Muy Grave': 21.22 },
    '101-200': { Leves: 1.58, Grave: 14.94, 'Muy Grave': 31.83 },
    '201-300': { Leves: 2.01, Grave: 18.06, 'Muy Grave': 42.44 },
    '301-400': { Leves: 2.44, Grave: 21.18, 'Muy Grave': 53.04 },
    '401-500': { Leves: 2.87, Grave: 24.29, 'Muy Grave': 63.64 },
    '501-600': { Leves: 3.29, Grave: 28.53, 'Muy Grave': 74.25 },
    '601-700': { Leves: 3.72, Grave: 32.77, 'Muy Grave': 84.85 },
    '701-800': { Leves: 4.15, Grave: 37.01, 'Muy Grave': 95.45 },
    '801-900': { Leves: 4.58, Grave: 41.25, 'Muy Grave': 106.05 },
    '901-a-mas': { Leves: 5.02, Grave: 45.49, 'Muy Grave': 116.65 }
};

// Severidad de cada pregunta (usando 'Leves' para coincidir con backend)
const SEVERIDAD_PREGUNTAS: Record<string, 'Leves' | 'Grave' | 'Muy Grave'> = {
    q1: 'Grave', q2: 'Leves', q3: 'Grave', q4: 'Grave', q5: 'Leves',
    q6: 'Grave', q7: 'Leves', q8: 'Grave', q9: 'Grave', q10: 'Grave',
    q11: 'Muy Grave', q12: 'Grave', q13: 'Grave', q14: 'Grave',
    q15: 'Grave', q16: 'Grave', q17: 'Grave', q18: 'Grave', q19: 'Leves',
    q20: 'Muy Grave', q21: 'Grave', q22: 'Leves', q23: 'Grave',
    q24: 'Muy Grave', q25: 'Grave', q26: 'Grave', q27: 'Grave',
    q28: 'Muy Grave', q29: 'Grave', q30: 'Grave', q31: 'Grave',
    q32: 'Grave', q33: 'Grave', q34: 'Grave', q35: 'Grave',
    q36: 'Grave', q37: 'Grave', q38: 'Leves', q39: 'Leves',
    q40: 'Grave', q41: 'Grave'
};

// Preguntas exentas para empresas MYPE
const PREGUNTAS_EXENTAS_MYPE = ['q36', 'q37', 'q38', 'q39', 'q41'];

type RiskLevel = 'Leves' | 'Grave' | 'Muy Grave';

interface RiskBreakdownItem {
    questionId: string;
    description: string;
    riskLevel: RiskLevel;
}

interface UseRiskCalculatorReturn {
    totalRiskExposure: number;
    riskBreakdown: RiskBreakdownItem[];
    riskCount: {
        leves: number;
        grave: number;
        muyGrave: number;
    };
    lastAddedFine: number;
    severidadMaxima: RiskLevel | 'Ninguna';
}

/**
 * Obtiene la columna correcta de la tabla para microempresas
 */
function getColumnaMicro(numTrabajadores: number): string {
    if (numTrabajadores >= 10) return '10 y más';
    return String(numTrabajadores);
}

/**
 * Obtiene la columna correcta de la tabla para pequeñas empresas
 */
function getColumnaPequena(numTrabajadores: number): string {
    if (numTrabajadores <= 5) return '1 a 5';
    if (numTrabajadores <= 10) return '6 a 10';
    if (numTrabajadores <= 20) return '11 a 20';
    if (numTrabajadores <= 30) return '21 a 30';
    if (numTrabajadores <= 40) return '31 a 40';
    if (numTrabajadores <= 50) return '41 a 50';
    if (numTrabajadores <= 60) return '51 a 60';
    if (numTrabajadores <= 70) return '61 a 70';
    if (numTrabajadores <= 99) return '71 a 99';
    return '100 y más';
}

/**
 * Obtiene la columna correcta de la tabla general (no MYPE)
 */
function getColumnaGeneral(numTrabajadores: number): string {
    if (numTrabajadores <= 10) return '1-10';
    if (numTrabajadores <= 25) return '11-25';
    if (numTrabajadores <= 50) return '26-50';
    if (numTrabajadores <= 100) return '51-100';
    if (numTrabajadores <= 200) return '101-200';
    if (numTrabajadores <= 300) return '201-300';
    if (numTrabajadores <= 400) return '301-400';
    if (numTrabajadores <= 500) return '401-500';
    if (numTrabajadores <= 600) return '501-600';
    if (numTrabajadores <= 700) return '601-700';
    if (numTrabajadores <= 800) return '701-800';
    if (numTrabajadores <= 900) return '801-900';
    return '901-a-mas';
}

/**
 * Obtiene las multas unitarias por severidad según tipo de empresa y trabajadores
 */
function getMultasUnitarias(
    tipoEmpresa: string,
    numTrabajadores: number
): { leves: number; grave: number; muyGrave: number } {
    if (numTrabajadores <= 0) {
        return { leves: 0, grave: 0, muyGrave: 0 };
    }

    if (tipoEmpresa === 'micro') {
        const columna = getColumnaMicro(numTrabajadores);
        const tabla = TABLA_MULTAS_MICRO[columna];
        return {
            leves: tabla?.Leves ?? 0,
            grave: tabla?.Grave ?? 0,
            muyGrave: tabla?.['Muy Grave'] ?? 0
        };
    }

    if (tipoEmpresa === 'pequena') {
        const columna = getColumnaPequena(numTrabajadores);
        const tabla = TABLA_MULTAS_PEQUENA[columna];
        return {
            leves: tabla?.Leves ?? 0,
            grave: tabla?.Grave ?? 0,
            muyGrave: tabla?.['Muy Grave'] ?? 0
        };
    }

    // No MYPE (mediana, grande)
    const columna = getColumnaGeneral(numTrabajadores);
    const tablaUIT = TABLA_MULTAS_GENERAL_UIT[columna];
    return {
        leves: (tablaUIT?.Leves ?? 0) * UIT_VALUE,
        grave: (tablaUIT?.Grave ?? 0) * UIT_VALUE,
        muyGrave: (tablaUIT?.['Muy Grave'] ?? 0) * UIT_VALUE
    };
}

/**
 * Hook para calcular la exposición a multas SUNAFIL en tiempo real.
 * Implementa MULTAS ACUMULATIVAS: suma la multa de cada infracción detectada.
 * 
 * @param answers - Respuestas del cuestionario { questionId: 'si' | 'no' }
 * @param numeroTrabajadores - Número de trabajadores de la empresa
 * @param tipoEmpresa - Tipo de empresa: 'micro', 'pequena', 'mediana', 'grande'
 * @param previousTotal - Total anterior para detectar incrementos
 */
export function useRiskCalculator(
    answers: Record<string, 'si' | 'no'>,
    numeroTrabajadores: number,
    tipoEmpresa: string = 'micro',
    previousTotal: number = 0
): UseRiskCalculatorReturn {

    const result = useMemo(() => {
        const riskBreakdown: RiskBreakdownItem[] = [];
        const riskCount = { leves: 0, grave: 0, muyGrave: 0 };
        const isMype = tipoEmpresa === 'micro' || tipoEmpresa === 'pequena';

        // Asegurar que numeroTrabajadores sea un número
        const numTrabajadores = Number(numeroTrabajadores) || 0;

        // Determinar severidad máxima
        let severidadMaxima: RiskLevel | 'Ninguna' = 'Ninguna';

        // Iterar sobre todas las respuestas
        Object.entries(answers).forEach(([questionId, answer]) => {
            // Solo sumar riesgo cuando la respuesta es "no"
            if (answer === 'no') {
                // Saltar preguntas exentas para MYPE
                if (isMype && PREGUNTAS_EXENTAS_MYPE.includes(questionId)) {
                    return;
                }

                const severidad = SEVERIDAD_PREGUNTAS[questionId];
                if (severidad) {
                    riskBreakdown.push({
                        questionId,
                        description: questionId,
                        riskLevel: severidad
                    });

                    // Contar por nivel de riesgo
                    switch (severidad) {
                        case 'Leves':
                            riskCount.leves++;
                            break;
                        case 'Grave':
                            riskCount.grave++;
                            break;
                        case 'Muy Grave':
                            riskCount.muyGrave++;
                            break;
                    }

                    // Actualizar severidad máxima
                    if (severidad === 'Muy Grave') {
                        severidadMaxima = 'Muy Grave';
                    } else if (severidad === 'Grave' && severidadMaxima !== 'Muy Grave') {
                        severidadMaxima = 'Grave';
                    } else if (severidad === 'Leves' && severidadMaxima === 'Ninguna') {
                        severidadMaxima = 'Leves';
                    }
                }
            }
        });

        // Obtener multas unitarias por severidad
        const multas = getMultasUnitarias(tipoEmpresa, numTrabajadores);

        // MULTAS ACUMULATIVAS: sumar multa de cada infracción
        const totalRiskExposure = (
            riskCount.leves * multas.leves +
            riskCount.grave * multas.grave +
            riskCount.muyGrave * multas.muyGrave
        );

        // Calcular lo que se agregó en la última respuesta
        const lastAddedFine = totalRiskExposure - previousTotal;

        return {
            totalRiskExposure,
            riskBreakdown,
            riskCount,
            lastAddedFine: lastAddedFine > 0 ? lastAddedFine : 0,
            severidadMaxima
        };
    }, [answers, numeroTrabajadores, tipoEmpresa, previousTotal]);

    return result;
}

/**
 * Formatea un número como moneda peruana (Soles)
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
    }).format(amount);
}
