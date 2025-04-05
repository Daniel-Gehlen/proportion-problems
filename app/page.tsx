"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { RefreshCw, BookOpen, Calculator } from "lucide-react"

// Tipos para os problemas
type ProblemType = "distribution" | "population" | "mixture" | "time"
type Problem = {
  type: ProblemType
  title: string
  description: string
  variables: Record<string, number>
  relations: string[]
  question: string
  solution: {
    steps: string[]
    answer: string
    fraction: string
    decimal: number
  }
}

export default function ProportionProblemGenerator() {
  const [problem, setProblem] = useState<Problem | null>(null)
  const [showSolution, setShowSolution] = useState(false)

  // Função para gerar um problema aleatório
  const generateProblem = () => {
    setShowSolution(false)

    // Escolher um tipo de problema aleatoriamente
    const problemTypes: ProblemType[] = ["distribution", "population", "mixture", "time"]
    const selectedType = problemTypes[Math.floor(Math.random() * problemTypes.length)]

    let newProblem: Problem

    switch (selectedType) {
      case "distribution":
        newProblem = generateDistributionProblem()
        break
      case "population":
        newProblem = generatePopulationProblem()
        break
      case "mixture":
        newProblem = generateMixtureProblem()
        break
      case "time":
        newProblem = generateTimeProblem()
        break
      default:
        newProblem = generateDistributionProblem()
    }

    setProblem(newProblem)
  }

  // Gerar um problema de distribuição (ex: dinheiro entre pessoas)
  const generateDistributionProblem = (): Problem => {
    // Gerar valores aleatórios
    const total = Math.floor(Math.random() * 900) + 100 // Total entre 100 e 1000
    const names = ["Ana", "Bruno", "Carlos", "Diana", "Eduardo", "Fernanda", "Gabriel", "Helena"]

    // Escolher 3 nomes aleatórios
    const shuffledNames = [...names].sort(() => 0.5 - Math.random())
    const selectedNames = shuffledNames.slice(0, 3)

    // Definir relações
    const multipliers = [2, 3, 4, 5]
    const m1 = multipliers[Math.floor(Math.random() * multipliers.length)]
    const m2 = multipliers[Math.floor(Math.random() * multipliers.length)]

    // Calcular a solução usando o método proposto
    const b = 2 // Valor fictício para a pessoa do meio
    const a = b * m1 // Primeira pessoa recebe m1 vezes a segunda
    const c = b / m2 // Terceira pessoa recebe 1/m2 da segunda

    const totalParts = a + b + c
    const bFraction = b / totalParts
    const bValue = Math.round(bFraction * total * 100) / 100

    return {
      type: "distribution",
      title: "Problema de Distribuição",
      description: `A quantia de R$ ${total.toFixed(2)} será dividida entre ${selectedNames[0]}, ${selectedNames[1]} e ${selectedNames[2]}. 
      ${selectedNames[0]} receberá ${m1} vezes o valor de ${selectedNames[1]}. 
      ${selectedNames[2]} receberá ${m2 === 2 ? "metade" : m2 === 3 ? "um terço" : m2 === 4 ? "um quarto" : "um quinto"} do valor de ${selectedNames[1]}.`,
      variables: {
        total,
        multiplier1: m1,
        multiplier2: m2,
      },
      relations: [
        `${selectedNames[0]} = ${m1} × ${selectedNames[1]}`,
        `${selectedNames[2]} = ${selectedNames[1]} ÷ ${m2}`,
      ],
      question: `Quanto ${selectedNames[1]} receberá?`,
      solution: {
        steps: [
          `1. Defina uma variável simples para ${selectedNames[1]}: ${selectedNames[1]} = ${b}`,
          `2. Calcule as outras quantidades com base nas relações:`,
          `   ${selectedNames[0]} = ${m1} × ${selectedNames[1]} = ${m1} × ${b} = ${a}`,
          `   ${selectedNames[2]} = ${selectedNames[1]} ÷ ${m2} = ${b} ÷ ${m2} = ${c}`,
          `3. Some todas as partes para ter o total: ${a} + ${b} + ${c} = ${totalParts}`,
          `4. Calcule a fração que ${selectedNames[1]} representa: ${b} ÷ ${totalParts} = ${b}/${totalParts}`,
          `5. Calcule o valor real: ${b}/${totalParts} × R$ ${total.toFixed(2)} = R$ ${bValue.toFixed(2)}`,
        ],
        answer: `R$ ${bValue.toFixed(2)}`,
        fraction: `${b}/${totalParts}`,
        decimal: bValue,
      },
    }
  }

  // Gerar um problema de população (ex: cidades)
  const generatePopulationProblem = (): Problem => {
    // Gerar valores aleatórios
    const total = Math.floor(Math.random() * 9000) + 1000 // Total entre 1000 e 10000
    const cities = [
      "São Paulo",
      "Rio de Janeiro",
      "Belo Horizonte",
      "Salvador",
      "Brasília",
      "Fortaleza",
      "Recife",
      "Porto Alegre",
      "Manaus",
      "Curitiba",
    ]

    // Escolher 3 cidades aleatórias
    const shuffledCities = [...cities].sort(() => 0.5 - Math.random())
    const selectedCities = shuffledCities.slice(0, 3)

    // Definir relações
    const multipliers = [2, 3, 4]
    const m1 = multipliers[Math.floor(Math.random() * multipliers.length)]
    const m2 = multipliers[Math.floor(Math.random() * multipliers.length)]

    // Calcular a solução usando o método proposto
    const a = 8 // Valor fictício para a maior cidade
    const b = a / m1 // Segunda cidade tem 1/m1 da primeira
    const c = b / m2 // Terceira cidade tem 1/m2 da segunda

    const totalParts = a + b + c
    const bFraction = b / totalParts
    const bValue = Math.round(bFraction * total * 100) / 100

    const resource = ["água", "energia elétrica", "recursos financeiros", "vacinas"][Math.floor(Math.random() * 4)]

    return {
      type: "population",
      title: "Problema de Distribuição por População",
      description: `Um total de ${total} unidades de ${resource} será distribuído entre as cidades de ${selectedCities[0]}, ${selectedCities[1]} e ${selectedCities[2]}.
      ${selectedCities[0]} tem população ${m1} vezes maior que ${selectedCities[1]}.
      ${selectedCities[2]} tem população ${m2} vezes menor que ${selectedCities[1]}.
      A distribuição será proporcional à população de cada cidade.`,
      variables: {
        total,
        multiplier1: m1,
        multiplier2: m2,
      },
      relations: [
        `${selectedCities[0]} = ${m1} × ${selectedCities[1]}`,
        `${selectedCities[2]} = ${selectedCities[1]} ÷ ${m2}`,
      ],
      question: `Quantas unidades de ${resource} ${selectedCities[1]} receberá?`,
      solution: {
        steps: [
          `1. Defina uma variável simples para a maior população (${selectedCities[0]}): ${selectedCities[0]} = ${a}`,
          `2. Calcule as outras quantidades com base nas relações:`,
          `   ${selectedCities[1]} = ${selectedCities[0]} ÷ ${m1} = ${a} ÷ ${m1} = ${b}`,
          `   ${selectedCities[2]} = ${selectedCities[1]} ÷ ${m2} = ${b} ÷ ${m2} = ${c}`,
          `3. Some todas as partes para ter o total: ${a} + ${b} + ${c} = ${totalParts}`,
          `4. Calcule a fração que ${selectedCities[1]} representa: ${b} ÷ ${totalParts} = ${b}/${totalParts}`,
          `5. Calcule o valor real: ${b}/${totalParts} × ${total} = ${bValue.toFixed(2)}`,
        ],
        answer: `${Math.round(bValue)} unidades`,
        fraction: `${b}/${totalParts}`,
        decimal: bValue,
      },
    }
  }

  // Gerar um problema de mistura (ex: soluções químicas)
  const generateMixtureProblem = (): Problem => {
    // Gerar valores aleatórios
    const total = Math.floor(Math.random() * 90) + 10 // Total entre 10 e 100
    const substances = ["ácido", "base", "solvente", "água", "álcool", "solução A", "solução B", "solução C"]

    // Escolher 3 substâncias aleatórias
    const shuffledSubstances = [...substances].sort(() => 0.5 - Math.random())
    const selectedSubstances = shuffledSubstances.slice(0, 3)

    // Definir relações
    const multipliers = [2, 3, 4, 5]
    const m1 = multipliers[Math.floor(Math.random() * multipliers.length)]
    const m2 = multipliers[Math.floor(Math.random() * multipliers.length)]

    // Calcular a solução usando o método proposto
    const a = 6 // Valor fictício para a primeira substância
    const b = a / m1 // Segunda substância é 1/m1 da primeira
    const c = a * m2 // Terceira substância é m2 vezes a primeira

    const totalParts = a + b + c
    const bFraction = b / totalParts
    const bValue = Math.round(bFraction * total * 100) / 100

    return {
      type: "mixture",
      title: "Problema de Mistura",
      description: `Uma mistura de ${total} litros contém ${selectedSubstances[0]}, ${selectedSubstances[1]} e ${selectedSubstances[2]}.
      A quantidade de ${selectedSubstances[0]} é ${m1} vezes maior que a de ${selectedSubstances[1]}.
      A quantidade de ${selectedSubstances[2]} é ${m2} vezes maior que a de ${selectedSubstances[0]}.`,
      variables: {
        total,
        multiplier1: m1,
        multiplier2: m2,
      },
      relations: [
        `${selectedSubstances[0]} = ${m1} × ${selectedSubstances[1]}`,
        `${selectedSubstances[2]} = ${m2} × ${selectedSubstances[0]}`,
      ],
      question: `Quantos litros de ${selectedSubstances[1]} há na mistura?`,
      solution: {
        steps: [
          `1. Defina uma variável simples para ${selectedSubstances[1]}: ${selectedSubstances[1]} = ${b}`,
          `2. Calcule as outras quantidades com base nas relações:`,
          `   ${selectedSubstances[0]} = ${m1} × ${selectedSubstances[1]} = ${m1} × ${b} = ${a}`,
          `   ${selectedSubstances[2]} = ${m2} × ${selectedSubstances[0]} = ${m2} × ${a} = ${c}`,
          `3. Some todas as partes para ter o total: ${a} + ${b} + ${c} = ${totalParts}`,
          `4. Calcule a fração que ${selectedSubstances[1]} representa: ${b} ÷ ${totalParts} = ${b}/${totalParts}`,
          `5. Calcule o valor real: ${b}/${totalParts} × ${total} = ${bValue.toFixed(2)}`,
        ],
        answer: `${bValue.toFixed(2)} litros`,
        fraction: `${b}/${totalParts}`,
        decimal: bValue,
      },
    }
  }

  // Gerar um problema de tempo (ex: horas de trabalho)
  const generateTimeProblem = (): Problem => {
    // Gerar valores aleatórios
    const total = Math.floor(Math.random() * 90) + 30 // Total entre 30 e 120
    const names = ["Ana", "Bruno", "Carlos", "Diana", "Eduardo", "Fernanda", "Gabriel", "Helena"]

    // Escolher 3 nomes aleatórios
    const shuffledNames = [...names].sort(() => 0.5 - Math.random())
    const selectedNames = shuffledNames.slice(0, 3)

    // Definir relações
    const multipliers = [2, 3, 1.5]
    const m1 = multipliers[Math.floor(Math.random() * multipliers.length)]
    const m2 = multipliers[Math.floor(Math.random() * multipliers.length)]

    // Calcular a solução usando o método proposto
    const b = 4 // Valor fictício para a pessoa do meio
    const a = b * m1 // Primeira pessoa trabalha m1 vezes mais que a segunda
    const c = b * m2 // Terceira pessoa trabalha m2 vezes mais que a segunda

    const totalParts = a + b + c
    const bFraction = b / totalParts
    const bValue = Math.round(bFraction * total * 100) / 100

    const task = ["um projeto", "uma tarefa", "uma construção", "um trabalho"][Math.floor(Math.random() * 4)]

    return {
      type: "time",
      title: "Problema de Tempo de Trabalho",
      description: `${selectedNames[0]}, ${selectedNames[1]} e ${selectedNames[2]} trabalham juntos em ${task} que leva ${total} horas para ser concluído.
      ${selectedNames[0]} trabalha ${m1 === 1.5 ? "1,5" : m1} vezes mais rápido que ${selectedNames[1]}.
      ${selectedNames[2]} trabalha ${m2 === 1.5 ? "1,5" : m2} vezes mais rápido que ${selectedNames[1]}.
      Se eles trabalharem separadamente, quanto tempo ${selectedNames[1]} levaria para concluir todo o trabalho sozinho?`,
      variables: {
        total,
        multiplier1: m1,
        multiplier2: m2,
      },
      relations: [
        `Velocidade de ${selectedNames[0]} = ${m1} × Velocidade de ${selectedNames[1]}`,
        `Velocidade de ${selectedNames[2]} = ${m2} × Velocidade de ${selectedNames[1]}`,
      ],
      question: `Quanto tempo ${selectedNames[1]} levaria para concluir todo o trabalho sozinho?`,
      solution: {
        steps: [
          `1. Defina uma variável simples para a velocidade de ${selectedNames[1]}: Velocidade de ${selectedNames[1]} = ${b}`,
          `2. Calcule as outras velocidades com base nas relações:`,
          `   Velocidade de ${selectedNames[0]} = ${m1} × Velocidade de ${selectedNames[1]} = ${m1} × ${b} = ${a}`,
          `   Velocidade de ${selectedNames[2]} = ${m2} × Velocidade de ${selectedNames[1]} = ${m2} × ${b} = ${c}`,
          `3. Some todas as velocidades para ter o total: ${a} + ${b} + ${c} = ${totalParts}`,
          `4. A fração que ${selectedNames[1]} representa do total é: ${b} ÷ ${totalParts} = ${b}/${totalParts}`,
          `5. Calcule o tempo total que ${selectedNames[1]} levaria sozinho:`,
          `   Se juntos levam ${total} horas, e ${selectedNames[1]} contribui com ${b}/${totalParts} do trabalho,`,
          `   então ${selectedNames[1]} sozinho levaria: ${total} ÷ (${b}/${totalParts}) = ${total} × (${totalParts}/${b}) = ${((total * totalParts) / b).toFixed(2)} horas`,
        ],
        answer: `${((total * totalParts) / b).toFixed(2)} horas`,
        fraction: `${totalParts}/${b}`,
        decimal: (total * totalParts) / b,
      },
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Gerador de Problemas de Proporção</h1>
        <p className="text-muted-foreground max-w-2xl">
          Este aplicativo gera problemas de proporção aleatórios e mostra a solução passo a passo usando o método de
          valores fictícios.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <Button onClick={generateProblem} size="lg" className="gap-2">
          <RefreshCw className="h-5 w-5" />
          Gerar Novo Problema
        </Button>
      </div>

      {problem && (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>{problem.title}</CardTitle>
            <CardDescription>Resolva este problema usando o método de valores fictícios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-lg">{problem.description}</p>
              <p className="font-bold mt-4">{problem.question}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Relações:</h3>
              <ul className="list-disc pl-5">
                {problem.relations.map((relation, index) => (
                  <li key={index}>{relation}</li>
                ))}
              </ul>
            </div>

            <Tabs defaultValue="solution" className="mt-6">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="solution" className="flex items-center gap-2" onClick={() => setShowSolution(true)}>
                  <BookOpen className="h-4 w-4" />
                  Ver Solução
                </TabsTrigger>
                <TabsTrigger value="practice" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Praticar
                </TabsTrigger>
              </TabsList>
              <TabsContent value="solution" className="pt-4">
                {showSolution && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Solução passo a passo:</h3>
                      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                        {problem.solution.steps.map((step, index) => (
                          <p key={index}>{step}</p>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <div>
                        <h3 className="font-semibold">Fração:</h3>
                        <p className="text-xl">{problem.solution.fraction}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Resposta final:</h3>
                        <p className="text-xl font-bold">{problem.solution.answer}</p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="practice" className="pt-4">
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Dicas para resolver:</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Escolha um valor fictício simples para uma das quantidades (ex: 2, 4, 8, 10).</li>
                      <li>Use as relações do problema para calcular as outras quantidades.</li>
                      <li>Some todas as partes para encontrar o total.</li>
                      <li>Calcule a fração que a parte desejada representa do total.</li>
                      <li>Multiplique a fração pelo valor total real para obter a resposta.</li>
                    </ol>
                  </div>

                  <div className="flex justify-center mt-4">
                    <Button variant="outline" onClick={() => setShowSolution(true)}>
                      Revelar Solução
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">Método de valores fictícios para problemas de proporção</p>
            <Button variant="ghost" size="sm" onClick={generateProblem}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Novo Problema
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

