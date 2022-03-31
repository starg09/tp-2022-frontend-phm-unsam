import {
  Box,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [puntaje, setPuntaje] = useState("0");

  //TODO: Generar este estado en base a mock data (y luego al backend).
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const todosOrigenes = checkedItems.every(Boolean);
  const algunosOrigenes = checkedItems.some(Boolean) && !todosOrigenes;

  return (
    <HStack minH="80vh" alignItems="stretch" bg="orange.200">
      <Box w="15%" p={3}>
        <VStack
          p={4}
          alignContent="flex-start"
          alignItems="stretch"
          bg="purple.300"
          borderRadius="2vh"
        >
          <Heading textAlign="center">Filtros</Heading>
          <Divider />
          <RadioGroup onChange={setPuntaje} value={puntaje} colorScheme="purple">
            <VStack alignItems="flex-start">
              <Heading size="md" alignSelf="center">
                Puntaje
              </Heading>
              <Radio size="md" value="5">
                5 puntos
              </Radio>
              <Radio size="md" value="4">
                4 o más puntos
              </Radio>
              <Radio size="md" value="3">
                3 o más puntos
              </Radio>
              <Radio size="md" value="2">
                2 o más puntos
              </Radio>
              <Radio size="md" value="0">
                Todos
              </Radio>
            </VStack>
          </RadioGroup>
          <Divider />
          <Heading size="md" alignSelf="center">
            Origen
          </Heading>
          <Checkbox
            colorScheme="purple"
            isChecked={todosOrigenes}
            isIndeterminate={algunosOrigenes}
            onChange={(e) =>
              setCheckedItems([e.target.checked, e.target.checked])
            }
          >
            Todos
          </Checkbox>
          <VStack alignItems="flex-start" pl={6} mt={1} spacing={1}>
            <Checkbox
              colorScheme="purple"
              isChecked={checkedItems[0]}
              onChange={(e) =>
                setCheckedItems([e.target.checked, checkedItems[1]])
              }
            >
              Argentina
            </Checkbox>
            <Checkbox
              colorScheme="purple"
              isChecked={checkedItems[1]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], e.target.checked])
              }
            >
              Brasil
            </Checkbox>
          </VStack>
        </VStack>
      </Box>
    </HStack>
  );
}
