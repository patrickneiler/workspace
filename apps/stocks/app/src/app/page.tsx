import { Container, Flex } from '@radix-ui/themes';
import { Purchase, Stock } from '@wrkspce/stocks/ui';
const AssistancePage = () => {
    return <Container className="mt-8">
        <Flex direction="column" gap={"4"}>
            <Purchase defaultAmount={100} name="Apple Inc." price={145.32} />
            <Stock name='APPL' price={145.32} />
        </Flex>
    </Container>
};
export default AssistancePage;