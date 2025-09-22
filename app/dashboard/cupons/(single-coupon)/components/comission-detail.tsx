'use client'

import StatsCard from '@/components/common/cards/stats-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { statsIcons } from '@/constants/analytics-data';
import React, { useMemo } from 'react';

interface CommissionDetailPageProps {
  total_commission: number;
  withDrawlAmmount: number;
}

const CommissionDetailPage = ({ total_commission, withDrawlAmmount }: CommissionDetailPageProps) => {

  // Calculate remaining commission
  const remainingCommission = total_commission - withDrawlAmmount;

  // Prepare stats cards data
  const stats = useMemo(() => {
    return [
      {
        key: 'total_commission',
        title: 'Commission Earned',
        value: total_commission,
        Icon: statsIcons.total_orders,
      },
      {
        key: 'withDrawn',
        title: 'Commission Withdrawn',
        value: withDrawlAmmount,
        Icon: statsIcons.total_revenue,
      },
      {
        key: 'remaining',
        title: 'Commission Remaining',
        value: remainingCommission,
        Icon: statsIcons.pending_orders,
      }
    ];
  }, [total_commission, withDrawlAmmount, remainingCommission]);

  return (
    <div>
      <Accordion
        type="multiple"
        defaultValue={["commission-details"]}
        className="space-y-4"
      >
        <AccordionItem value="commission-details" className="rounded-sm border-0">
          <AccordionTrigger className="px-6 bg-[#EEEEEE] py-4 hover:no-underline">
            <h2 className="text-base font-semibold text-gray-900">
              Influencer Commission Details
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <Card className="border-0">
              <CardContent className="w-full px-0 border-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {stats.map(({ key, title, value, Icon }) => (
                    <StatsCard
                      key={key}
                      className="border-2"
                      Icon={Icon}
                      title={title}
                      value={value.toLocaleString()} // nicely formatted
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default CommissionDetailPage;
